import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  useAdminLocations,
  useAdminCreateLocation,
  useAdminUpdateLocation,
  useAdminDeleteLocation,
  usePrefetchLocation,
} from "../../services/api";
import { useAdminAuth } from "../../context/AdminAuthContext";

// Enterprise pagination helper with ellipses
const getPageNumbers = (current, total) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
};

// Zero-delay structural skeleton table for cities
const LocationTableSkeleton = () => (
  <div className="overflow-x-auto animate-pulse">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <th className="px-6 py-4">City Name</th>
          <th className="px-6 py-4">State</th>
          <th className="px-6 py-4">URL Slug</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4 text-center">Live Page</th>
          <th className="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <tr key={i}>
            <td className="px-6 py-4">
              <div className="h-4 w-32 bg-slate-200 rounded-md"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-5 w-24 bg-slate-100 rounded-md"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-3.5 w-20 bg-slate-100 rounded-md"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-6 w-16 bg-slate-100 rounded-full"></div>
            </td>
            <td className="px-6 py-4 text-center">
              <div className="h-4 w-16 bg-slate-100 rounded-md mx-auto"></div>
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <div className="w-7 h-7 bg-slate-100 rounded-lg"></div>
                <div className="w-7 h-7 bg-slate-100 rounded-lg"></div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

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
  const { data: locations = [], isLoading: loading } = useAdminLocations(admin?.token);
  const prefetchLocation = usePrefetchLocation();

  const createMutation = useAdminCreateLocation(admin?.token);
  const updateMutation = useAdminUpdateLocation(admin?.token);
  const deleteMutation = useAdminDeleteLocation(admin?.token);
  const saving = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, inactive
  const [selectedState, setSelectedState] = useState("all");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Add / Edit modal state
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editingLoc, setEditingLoc] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    slug: "",
    isActive: true,
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim() || !formData.state.trim()) {
      setFormError("City Name and State are required.");
      return;
    }

    if (modalMode === "add") {
      createMutation.mutate(formData, {
        onSuccess: (res) => {
          setSuccessToast(`City "${res.location?.name || formData.name}" added successfully!`);
          closeModal();
        },
        onError: (err) => {
          setFormError(err.message || "Failed to save city. Check if slug already exists.");
        },
      });
    } else if (modalMode === "edit" && editingLoc) {
      updateMutation.mutate(
        { id: editingLoc._id, payload: formData },
        {
          onSuccess: (res) => {
            setSuccessToast(`City "${res.location?.name || formData.name}" updated successfully!`);
            closeModal();
          },
          onError: (err) => {
            setFormError(err.message || "Failed to save city. Check if slug already exists.");
          },
        }
      );
    }
  };

  // Quick toggle active (TanStack onMutate provides 0ms instant UI update)
  const handleToggleActive = (loc) => {
    updateMutation.mutate(
      { id: loc._id, payload: { isActive: !loc.isActive } },
      {
        onSuccess: (res) => {
          setSuccessToast(
            `"${loc.name}" is now ${res?.location?.isActive ?? !loc.isActive ? "Active" : "Inactive"}.`
          );
        },
        onError: (err) => {
          alert("Failed to toggle status: " + err.message);
        },
      }
    );
  };

  // Delete handler (TanStack onMutate provides 0ms instant row removal)
  const handleDelete = (loc) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${loc.name}"? All programmatic pages for this city will become unavailable.`
      )
    ) {
      return;
    }

    deleteMutation.mutate(loc._id, {
      onSuccess: () => {
        setSuccessToast(`City "${loc.name}" deleted.`);
      },
      onError: (err) => {
        alert("Failed to delete city: " + err.message);
      },
    });
  };

  // Unique list of Indian states in current dataset for state filter dropdown
  const uniqueStates = useMemo(() => {
    const states = Array.from(new Set(locations.map((l) => l.state))).filter(Boolean);
    return states.sort((a, b) => a.localeCompare(b));
  }, [locations]);

  // Filter & search
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return locations.filter((loc) => {
      const matchesSearch =
        !q ||
        loc.name?.toLowerCase().includes(q) ||
        loc.state?.toLowerCase().includes(q) ||
        loc.slug?.toLowerCase().includes(q);

      if (!matchesSearch) return false;
      if (filter === "active" && !loc.isActive) return false;
      if (filter === "inactive" && loc.isActive) return false;
      if (selectedState !== "all" && loc.state !== selectedState) return false;
      return true;
    });
  }, [locations, search, filter, selectedState]);

  // Paginated records
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page, itemsPerPage]);

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
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search bar with clear button */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by city, state, or slug..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900"
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
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                title="Clear search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filters & Add button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* State filter dropdown */}
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All States ({uniqueStates.length})</option>
              {uniqueStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            {/* Status pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              {["all", "active", "inactive"].map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${filter === f
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Reset Filters button if any active */}
            {(search || filter !== "all" || selectedState !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setFilter("all");
                  setSelectedState("all");
                  setPage(1);
                }}
                className="text-xs font-bold text-slate-500 hover:text-blue-600 px-2 py-1"
              >
                Reset
              </button>
            )}

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 transition-all"
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
        {loading && locations.length === 0 ? (
          <LocationTableSkeleton />
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <p className="text-base font-bold text-slate-900">No cities found</p>
            <p className="text-xs text-slate-500">
              {search || selectedState !== "all" || filter !== "all"
                ? "Try adjusting your search query or filters."
                : "Click 'Add New City' to create your first location."}
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
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${loc.isActive
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                            }`}
                          title="Click to toggle Active / Inactive"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${loc.isActive ? "bg-green-500" : "bg-slate-400"
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
                            onMouseEnter={() => prefetchLocation(loc.slug)}
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
            {filtered.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-100 bg-white text-xs text-slate-500">
                <div className="flex flex-wrap items-center gap-4">
                  <span>
                    Showing <strong className="text-slate-800 font-bold">{(page - 1) * itemsPerPage + 1}</strong> to{" "}
                    <strong className="text-slate-800 font-bold">
                      {Math.min(page * itemsPerPage, filtered.length)}
                    </strong>{" "}
                    of <strong className="text-slate-800 font-bold">{filtered.length}</strong> cities
                    {filtered.length !== locations.length && (
                      <span className="text-slate-400 ml-1">
                        (filtered from {locations.length} total)
                      </span>
                    )}
                  </span>

                  {/* Items per page selector */}
                  <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
                    <label htmlFor="perPageSelect" className="text-slate-500 font-medium">Per page:</label>
                    <select
                      id="perPageSelect"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setPage(1);
                      }}
                      className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2 py-1 font-semibold focus:ring-1 focus:ring-blue-600 focus:outline-none cursor-pointer"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    {/* First Page button */}
                    <button
                      onClick={() => setPage(1)}
                      disabled={page === 1}
                      title="First Page"
                      className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Previous button */}
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed font-medium text-slate-600 transition-colors"
                    >
                      Prev
                    </button>

                    {/* Dynamic Page Buttons */}
                    {getPageNumbers(page, totalPages).map((p, idx) =>
                      p === "..." ? (
                        <span key={`dots-${idx}`} className="px-2 py-1 text-slate-400 font-semibold">
                          ...
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${page === p
                              ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                          {p}
                        </button>
                      )
                    )}

                    {/* Next button */}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed font-medium text-slate-600 transition-colors"
                    >
                      Next
                    </button>

                    {/* Last Page button */}
                    <button
                      onClick={() => setPage(totalPages)}
                      disabled={page === totalPages}
                      title="Last Page"
                      className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
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
