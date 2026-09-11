import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  adminFetchLocations,
  adminCreateLocation,
  adminUpdateLocation,
  adminDeleteLocation,
} from "../../services/api";
import { useAdminAuth } from "../../context/AdminAuthContext";

// In-memory cache for CountriesNow API responses
const countriesNowCache = {
  states: null,
  citiesByState: {},
};

const cleanGeoName = (str) => {
  if (!str) return "";
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
};

const toSlug = (str) => {
  return cleanGeoName(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Fetch all Indian States purely from CountriesNow API
const fetchCountriesNowStates = async () => {
  if (countriesNowCache.states) return countriesNowCache.states;
  try {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states/q?country=India"
    );
    if (res.ok) {
      const json = await res.json();
      if (!json.error && Array.isArray(json.data?.states)) {
        const stateNames = json.data.states
          .map((s) => cleanGeoName(s.name))
          .filter(Boolean);
        const unique = Array.from(new Set(stateNames)).sort((a, b) =>
          a.localeCompare(b)
        );
        countriesNowCache.states = unique;
        return unique;
      }
    }
  } catch (err) {
    console.warn("CountriesNow states API error:", err);
  }
  return [];
};

const fetchCountriesNowCities = async (stateName) => {
  if (!stateName) return [];
  const key = stateName.toLowerCase().trim();
  if (countriesNowCache.citiesByState[key]) {
    return countriesNowCache.citiesByState[key];
  }
  try {
    const res = await fetch(
      `https://countriesnow.space/api/v0.1/countries/state/cities/q?country=India&state=${encodeURIComponent(
        stateName.trim()
      )}`
    );
    if (res.ok) {
      const json = await res.json();
      if (!json.error && Array.isArray(json.data)) {
        const cleaned = json.data
          .map((c) => cleanGeoName(c))
          .filter((c) => c && c.length > 1);
        const unique = Array.from(new Set(cleaned)).sort((a, b) =>
          a.localeCompare(b)
        );
        countriesNowCache.citiesByState[key] = unique;
        return unique;
      }
    }
  } catch (err) {
    console.warn(`CountriesNow cities API error for ${stateName}:`, err);
  }
  return [];
};

const AdminLocations = () => {
  const { admin } = useAdminAuth();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, inactive
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  // Add / Edit modal state
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editingLoc, setEditingLoc] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    slug: "",
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [successToast, setSuccessToast] = useState("");

  // CountriesNow API State & City selector state (100% loaded from API)
  const [statesList, setStatesList] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [citiesList, setCitiesList] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [cityInputMode, setCityInputMode] = useState("dropdown"); // 'dropdown' | 'custom'

  // Fetch States from CountriesNow API on mount
  useEffect(() => {
    let isMounted = true;
    setLoadingStates(true);
    fetchCountriesNowStates()
      .then((states) => {
        if (isMounted && Array.isArray(states) && states.length > 0) {
          setStatesList(states);
        }
      })
      .finally(() => {
        if (isMounted) setLoadingStates(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const loadLocations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminFetchLocations(admin.token);
      if (Array.isArray(data)) {
        setLocations(data);
      }
    } catch (err) {
      console.error("Failed to load locations:", err);
    } finally {
      setLoading(false);
    }
  }, [admin.token]);

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  // Toast auto-hide
  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = locations.length;
    const active = locations.filter((l) => l.isActive).length;
    const inactive = total - active;
    const statesCount = new Set(locations.map((l) => l.state)).size;
    return { total, active, inactive, statesCount };
  }, [locations]);

  // Cascading handler: When user selects State
  const handleStateChange = async (selectedState) => {
    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      name: "",
      slug: "",
    }));
    setCityInputMode("dropdown");

    if (!selectedState) {
      setCitiesList([]);
      return;
    }

    setLoadingCities(true);
    try {
      const cities = await fetchCountriesNowCities(selectedState);
      setCitiesList(cities);
    } catch (err) {
      console.error("Failed to load cities for state:", err);
      setCitiesList([]);
    } finally {
      setLoadingCities(false);
    }
  };

  // Cascading handler: When user selects City from dropdown
  const handleCityDropdownSelect = (selectedCity) => {
    if (selectedCity === "__custom__") {
      setCityInputMode("custom");
      setFormData((prev) => ({ ...prev, name: "", slug: "" }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      name: selectedCity,
      slug: toSlug(selectedCity),
    }));
  };

  // Manual city name input handler
  const handleNameChange = (name) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: modalMode === "add" ? toSlug(name) : prev.slug,
    }));
  };

  const openAddModal = () => {
    setFormData({
      name: "",
      state: "",
      slug: "",
      isActive: true,
    });
    setCitiesList([]);
    setCityInputMode("dropdown");
    setFormError("");
    setModalMode("add");
  };

  const openEditModal = async (loc) => {
    setEditingLoc(loc);
    setFormData({
      name: loc.name,
      state: loc.state,
      slug: loc.slug,
      isActive: Boolean(loc.isActive),
    });
    setFormError("");
    setModalMode("edit");

    if (loc.state) {
      setLoadingCities(true);
      try {
        const cities = await fetchCountriesNowCities(loc.state);
        setCitiesList(cities);
        if (cities.length > 0 && !cities.includes(loc.name)) {
          setCityInputMode("custom");
        } else {
          setCityInputMode("dropdown");
        }
      } catch {
        setCityInputMode("custom");
      } finally {
        setLoadingCities(false);
      }
    } else {
      setCityInputMode("custom");
    }
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingLoc(null);
    setCitiesList([]);
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim() || !formData.state.trim()) {
      setFormError("City Name and State are required.");
      return;
    }

    setSaving(true);
    try {
      if (modalMode === "add") {
        const res = await adminCreateLocation(admin.token, formData);
        setLocations((prev) => [res.location, ...prev]);
        setSuccessToast(`City "${res.location.name}" added successfully!`);
      } else if (modalMode === "edit" && editingLoc) {
        const res = await adminUpdateLocation(admin.token, editingLoc._id, formData);
        setLocations((prev) =>
          prev.map((l) => (l._id === editingLoc._id ? res.location : l))
        );
        setSuccessToast(`City "${res.location.name}" updated successfully!`);
      }
      closeModal();
    } catch (err) {
      setFormError(err.message || "Failed to save city. Check if slug already exists.");
    } finally {
      setSaving(false);
    }
  };

  // Quick toggle active
  const handleToggleActive = async (loc) => {
    try {
      const updated = await adminUpdateLocation(admin.token, loc._id, {
        isActive: !loc.isActive,
      });
      setLocations((prev) =>
        prev.map((l) => (l._id === loc._id ? updated.location : l))
      );
      setSuccessToast(
        `"${loc.name}" is now ${updated.location.isActive ? "Active" : "Inactive"}.`
      );
    } catch (err) {
      alert("Failed to toggle status: " + err.message);
    }
  };

  // Delete handler
  const handleDelete = async (loc) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${loc.name}"? All programmatic pages for this city will become unavailable.`
      )
    ) {
      return;
    }

    try {
      await adminDeleteLocation(admin.token, loc._id);
      setLocations((prev) => prev.filter((l) => l._id !== loc._id));
      setSuccessToast(`City "${loc.name}" deleted.`);
    } catch (err) {
      alert("Failed to delete city: " + err.message);
    }
  };

  // Filter & search
  const filtered = useMemo(() => {
    return locations.filter((loc) => {
      const matchesSearch =
        loc.name.toLowerCase().includes(search.toLowerCase()) ||
        loc.state.toLowerCase().includes(search.toLowerCase()) ||
        loc.slug.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (filter === "active") return loc.isActive;
      if (filter === "inactive") return !loc.isActive;
      return true;
    });
  }, [locations, search, filter]);

  // Paginated records
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  return (
    <AdminLayout
      title="Manage Cities & Locations"
      subtitle="Add, edit, enable/disable programmatic city pages"
    >
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-fade-in">
          <svg
            className="w-5 h-5 text-green-400 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-semibold">{successToast}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Total Cities
          </p>
          <p className="text-3xl font-extrabold text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">
            Active Pages
          </p>
          <p className="text-3xl font-extrabold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
            Inactive / Hidden
          </p>
          <p className="text-3xl font-extrabold text-amber-600">{stats.inactive}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            States Covered
          </p>
          <p className="text-3xl font-extrabold text-blue-600">{stats.statesCount}</p>
        </div>
      </div>

      {/* Action Bar & Controls */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by city, state, or slug..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filters & Add button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              {["all", "active", "inactive"].map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    filter === f
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New City
            </button>
          </div>
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-slate-500 text-xs font-semibold">Loading cities...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <p className="text-base font-bold text-slate-900">No cities found</p>
            <p className="text-xs text-slate-500">
              {search ? "Try adjusting your search query." : "Click 'Add New City' to create your first location."}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">City Name</th>
                    <th className="px-6 py-4">State</th>
                    <th className="px-6 py-4">URL Slug</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Live Page</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {paginated.map((loc) => (
                    <tr key={loc._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-extrabold text-slate-900">{loc.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                          {loc.state}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">
                        /{loc.slug}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleActive(loc)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            loc.isActive
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                          title="Click to toggle Active / Inactive"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              loc.isActive ? "bg-green-500" : "bg-slate-400"
                            }`}
                          />
                          {loc.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {loc.isActive ? (
                          <Link
                            to={`/${loc.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            View Page
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Inactive</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(loc)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit City"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(loc)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete City"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                <span>
                  Showing {(page - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(page * itemsPerPage, filtered.length)} of {filtered.length} cities
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-2 py-1 text-slate-700 font-bold">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add / Edit City Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-900">
                {modalMode === "add" ? "Add New City" : `Edit ${editingLoc?.name}`}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600 flex items-start gap-2">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Indian State Selector */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    1. Select Indian State *
                  </label>
                  {loadingStates && (
                    <span className="text-[10px] font-semibold text-blue-600 animate-pulse">
                      Updating states...
                    </span>
                  )}
                </div>
                <select
                  required
                  disabled={loadingStates}
                  value={formData.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 cursor-pointer disabled:opacity-60"
                >
                  <option value="">
                    {loadingStates
                      ? "⏳ Loading states from API..."
                      : statesList.length > 0
                      ? `-- Choose Indian State (${statesList.length} available) --`
                      : "-- No states returned from API --"}
                  </option>
                  {statesList.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. City Selector (Cascades from Selected State) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Select City *
                  </label>
                  {formData.state && (
                    <button
                      type="button"
                      onClick={() =>
                        setCityInputMode((m) =>
                          m === "dropdown" ? "custom" : "dropdown"
                        )
                      }
                      className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {cityInputMode === "dropdown"
                        ? "✏️ Type manually instead"
                        : "📋 Pick from list"}
                    </button>
                  )}
                </div>

                {cityInputMode === "dropdown" ? (
                  <select
                    required
                    disabled={!formData.state || loadingCities}
                    value={formData.name}
                    onChange={(e) => handleCityDropdownSelect(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {!formData.state ? (
                      <option value="">-- First choose a State above --</option>
                    ) : loadingCities ? (
                      <option value="">⏳ Fetching cities from CountriesNow API...</option>
                    ) : (
                      <>
                        <option value="">
                          {citiesList.length > 0
                            ? `-- Select City (${citiesList.length} available) --`
                            : "-- No cities returned from API (click type manually) --"}
                        </option>
                        {citiesList.map((ct) => (
                          <option key={ct} value={ct}>
                            {ct}
                          </option>
                        ))}
                        <option value="__custom__">
                          ✏️ Other / Custom City (Type manually)...
                        </option>
                      </>
                    )}
                  </select>
                ) : (
                  <div className="space-y-1">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kanpur, Navi Mumbai, etc."
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900"
                    />
                    <p className="text-[11px] text-slate-400">
                      Manual input mode active. Type any city or industrial area.
                    </p>
                  </div>
                )}
              </div>

              {/* 3. URL Slug */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  3. URL Slug (Page Path)
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden text-sm focus-within:ring-2 focus-within:ring-blue-600">
                  <span className="px-3 text-slate-400 bg-slate-100 text-xs font-mono select-none">
                    /
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. kanpur"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-"),
                      })
                    }
                    className="w-full px-3 py-2.5 bg-transparent focus:outline-none font-mono text-xs text-slate-900"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Page URL: inkmixingroller.com/{formData.slug || "city"}
                </p>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-slate-900">Active Status</p>
                  <p className="text-[11px] text-slate-500">
                    Enable to make programmatic pages live immediately
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 disabled:opacity-50"
                >
                  {saving ? "Saving..." : modalMode === "add" ? "Create City" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminLocations;
