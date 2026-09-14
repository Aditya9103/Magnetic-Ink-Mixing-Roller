import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/* ═══════════════════════════════════════════════════════════════════════════
   1. CORE HTTP FETCH FUNCTIONS
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Fetch a single location by slug
 * @param {string} slug
 * @returns {Promise<Object>}
 */
export const fetchLocation = async (slug) => {
  const res = await fetch(`${BASE_URL}/locations/${slug}`);
  if (!res.ok) {
    const error = new Error(`Location ${slug} not found`);
    error.status = res.status;
    throw error;
  }
  return res.json();
};

/**
 * Fetch all active locations
 * @returns {Promise<Array>}
 */
export const fetchLocations = async () => {
  const res = await fetch(`${BASE_URL}/locations`);
  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }
  return res.json();
};

/**
 * Admin: Fetch all locations (including inactive)
 * @param {string} token
 * @returns {Promise<Array>}
 */
export const adminFetchLocations = async (token) => {
  const res = await fetch(`${BASE_URL}/locations/all`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    throw new Error("Failed to fetch all locations");
  }
  return res.json();
};

/**
 * Admin: Create a new location / city
 * @param {string} token
 * @param {{ name: string, state: string, slug?: string, isActive?: boolean }} payload
 * @returns {Promise<{ message: string, location: Object }>}
 */
export const adminCreateLocation = async (token, payload) => {
  const res = await fetch(`${BASE_URL}/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create location");
  }
  return data;
};

/**
 * Admin: Update a location / city
 * @param {string} token
 * @param {string} id
 * @param {{ name?: string, state?: string, slug?: string, isActive?: boolean }} payload
 * @returns {Promise<{ message: string, location: Object }>}
 */
export const adminUpdateLocation = async (token, id, payload) => {
  const res = await fetch(`${BASE_URL}/locations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update location");
  }
  return data;
};

/**
 * Admin: Delete a location / city
 * @param {string} token
 * @param {string} id
 * @returns {Promise<{ message: string }>}
 */
export const adminDeleteLocation = async (token, id) => {
  const res = await fetch(`${BASE_URL}/locations/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete location");
  }
  return data;
};

/**
 * Submit a "Get a Quote" form request
 * @param {Object} payload - Form data
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const submitQuote = async (payload) => {
  const currentHost = typeof window !== 'undefined' ? window.location.hostname.replace(/^www\./, '') : 'inkmixingroller.com';
  const finalPayload = { sourceWebsite: currentHost, ...payload };

  const res = await fetch(`${BASE_URL}/forms/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(finalPayload),
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      data.errors?.[0]?.msg ||
      data.message ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
};

/**
 * Submit a "Contact Us" form request
 * @param {Object} payload - Form data
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const submitContact = async (payload) => {
  const currentHost = typeof window !== 'undefined' ? window.location.hostname.replace(/^www\./, '') : 'inkmixingroller.com';
  const finalPayload = { sourceWebsite: currentHost, ...payload };

  const res = await fetch(`${BASE_URL}/forms/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(finalPayload),
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      data.errors?.[0]?.msg ||
      data.message ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
};

/**
 * Admin: Login
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{ token: string, username: string }>}
 */
export const adminLogin = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed.");
  return data;
};

/**
 * Client-side JWT expiration check
 * @param {string} token
 * @returns {boolean}
 */
export const isTokenExpired = (token) => {
  if (!token || typeof token !== "string") return true;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return false;
  }
};

/**
 * Admin: Verify token with server
 * Treats network errors, Cloudflare rate limits (429), or 5xx server issues as transient errors,
 * ONLY returning valid: false when the server explicitly returns 401 Unauthorized or 403 Forbidden.
 * @param {string} token
 * @returns {Promise<{ valid: boolean, reason?: string, transient?: boolean }>}
 */
export const verifyToken = async (token) => {
  if (!token) return { valid: false, reason: "missing" };
  if (isTokenExpired(token)) return { valid: false, reason: "expired" };

  try {
    const res = await fetch(`${BASE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 401 or 403 means backend explicitly rejected the token as invalid or expired
    if (res.status === 401 || res.status === 403) {
      return { valid: false, reason: "unauthorized" };
    }

    // 200 OK means valid
    if (res.ok) {
      return { valid: true };
    }

    // Any other status (429 rate limit, 500/502/503/504 server downtime)
    // is a transient server error, NOT an invalid token.
    console.warn(`Auth verify returned transient status ${res.status}. Preserving session.`);
    return { valid: true, transient: true };
  } catch (err) {
    // Network failure, aborted request on rapid refresh, offline
    console.warn("Auth verify network failure. Preserving session.", err);
    return { valid: true, transient: true };
  }
};

/**
 * Admin: Fetch submissions
 * @param {string} token
 * @param {{ type?: string, isRead?: boolean, sourceWebsite?: string, page?: number, limit?: number }} params
 */
export const fetchSubmissions = async (token, params = {}) => {
  const query = new URLSearchParams();
  if (params.type) query.set("type", params.type);
  if (params.isRead !== undefined) query.set("isRead", params.isRead);
  if (params.sourceWebsite) query.set("sourceWebsite", params.sourceWebsite);
  if (params.page) query.set("page", params.page);
  if (params.limit) query.set("limit", params.limit);

  const res = await fetch(`${BASE_URL}/admin/submissions?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch submissions.");
  return res.json();
};

/**
 * Admin: Fetch dashboard stats
 * @param {string} token
 */
export const fetchStats = async (token) => {
  const res = await fetch(`${BASE_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch stats.");
  return res.json();
};

/**
 * Admin: Mark submission as read/unread
 * @param {string} token
 * @param {string} id
 * @param {boolean} isRead
 */
export const markSubmissionRead = async (token, id, isRead) => {
  const res = await fetch(`${BASE_URL}/admin/submissions/${id}/read`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isRead }),
  });
  if (!res.ok) throw new Error("Failed to update submission.");
  return res.json();
};

/**
 * Admin: Delete a submission
 * @param {string} token
 * @param {string} id
 */
export const deleteSubmission = async (token, id) => {
  const res = await fetch(`${BASE_URL}/admin/submissions/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete submission.");
  return res.json();
};

/* ═══════════════════════════════════════════════════════════════════════════
   2. TANSTACK QUERY KEYS
   ═══════════════════════════════════════════════════════════════════════════ */

export const QUERY_KEYS = {
  locations: ["locations"],
  location: (slug) => ["location", slug],
  adminStats: ["admin", "stats"],
  adminSubmissions: (params) => ["admin", "submissions", params],
  adminLocations: ["admin", "locations"],
};

/* ═══════════════════════════════════════════════════════════════════════════
   3. TANSTACK CUSTOM HOOKS (SINGLE PLACE FOR ALL API CALLS)
   ═══════════════════════════════════════════════════════════════════════════ */

/** Hook: Fetch and cache all active locations, and automatically seed individual city caches */
export const useLocations = (options = {}) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.locations,
    queryFn: async () => {
      const data = await fetchLocations();
      if (Array.isArray(data)) {
        // Automatically seed query cache for all individual cities for 0ms instant loads
        data.forEach((loc) => {
          if (loc && loc.slug) {
            queryClient.setQueryData(QUERY_KEYS.location(loc.slug), loc);
          }
        });
      }
      return data;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes fresh
    ...options,
  });
};

/** Hook: Fetch and cache a single location with instant initialData derivation from locations cache */
export const useLocation = (slug, options = {}) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.location(slug),
    queryFn: () => fetchLocation(slug),
    initialData: () => {
      if (!slug) return undefined;
      // 1. Direct hit from single location cache
      const cachedDirect = queryClient.getQueryData(QUERY_KEYS.location(slug));
      if (cachedDirect) return cachedDirect;

      // 2. Derive from all-locations array for 0ms transition
      const allLocations = queryClient.getQueryData(QUERY_KEYS.locations);
      if (Array.isArray(allLocations)) {
        return allLocations.find((loc) => loc.slug === slug);
      }
      return undefined;
    },
    initialDataUpdatedAt: () => {
      return (
        queryClient.getQueryState(QUERY_KEYS.location(slug))?.dataUpdatedAt ||
        queryClient.getQueryState(QUERY_KEYS.locations)?.dataUpdatedAt
      );
    },
    staleTime: 1000 * 60 * 30, // 30 minutes fresh
    ...options,
  });
};

/** Hook: Prefetch a single location on hover */
export const usePrefetchLocation = () => {
  const queryClient = useQueryClient();
  return (slug) => {
    if (!slug) return;
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.location(slug),
      queryFn: () => fetchLocation(slug),
    });
  };
};

/** Hook: Prefetch all locations on hover */
export const usePrefetchLocations = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.locations,
      queryFn: fetchLocations,
    });
  };
};

/** Hook: Submit Get a Quote form */
export const useSubmitQuote = (options = {}) => {
  return useMutation({
    mutationFn: submitQuote,
    ...options,
  });
};

/** Hook: Submit Contact Us form */
export const useSubmitContact = (options = {}) => {
  return useMutation({
    mutationFn: submitContact,
    ...options,
  });
};

/** Hook: Admin dashboard statistics */
export const useAdminStats = (token, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.adminStats, token],
    queryFn: () => fetchStats(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
    refetchOnWindowFocus: true, // Auto refetch when admin switches tabs back
    refetchOnMount: true, // Always fetch latest when opening/refreshing page
    ...options,
  });
};

/** Hook: Admin submissions list */
export const useAdminSubmissions = (token, params = {}, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.adminSubmissions(params), token],
    queryFn: () => fetchSubmissions(token, params),
    enabled: !!token,
    staleTime: 1000 * 60 * 2, // 2 minutes fresh
    refetchOnWindowFocus: true, // Auto refetch when admin switches tabs back
    refetchOnMount: true, // Always fetch latest when opening/refreshing page
    placeholderData: keepPreviousData,
    ...options,
  });
};

/** Hook: Admin mark submission read */
export const useMarkSubmissionRead = (token, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isRead }) => markSubmissionRead(token, id, isRead),
    onMutate: async ({ id, isRead }) => {
      // Optimistically update
      await queryClient.cancelQueries({ queryKey: ["admin", "submissions"] });
      const previousStats = queryClient.getQueryData(QUERY_KEYS.adminStats);
      queryClient.setQueriesData({ queryKey: ["admin", "submissions"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          submissions: old.submissions.map((s) => s._id === id ? { ...s, isRead } : s),
        };
      });
      return { previousStats };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "submissions"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminStats });
    },
    ...options,
  });
};

/** Hook: Admin delete submission */
export const useDeleteSubmission = (token, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteSubmission(token, id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["admin", "submissions"] });
      queryClient.setQueriesData({ queryKey: ["admin", "submissions"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          submissions: old.submissions.filter((s) => s._id !== id),
          total: old.total - 1
        };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "submissions"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminStats });
    },
    ...options,
  });
};

/** Hook: Admin fetch all locations */
export const useAdminLocations = (token, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.adminLocations, token],
    queryFn: () => adminFetchLocations(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 15, // 15 minutes fresh cache
    placeholderData: keepPreviousData,
    ...options,
  });
};

/** Hook: Admin create location */
export const useAdminCreateLocation = (token, options = {}) => {
  const queryClient = useQueryClient();
  const queryKey = [...QUERY_KEYS.adminLocations, token];

  return useMutation({
    mutationFn: (payload) => adminCreateLocation(token, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.locations });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminLocations });
      if (res?.location) {
        // Optimistically insert into admin locations list
        const prev = queryClient.getQueryData(queryKey);
        if (Array.isArray(prev)) {
          queryClient.setQueryData(queryKey, [res.location, ...prev]);
        }
        if (res.location.slug) {
          queryClient.setQueryData(QUERY_KEYS.location(res.location.slug), res.location);
        }
      }
    },
    ...options,
  });
};

/** Hook: Admin update location with 0ms optimistic updates */
export const useAdminUpdateLocation = (token, options = {}) => {
  const queryClient = useQueryClient();
  const queryKey = [...QUERY_KEYS.adminLocations, token];

  return useMutation({
    mutationFn: ({ id, payload }) => adminUpdateLocation(token, id, payload),
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousLocations = queryClient.getQueryData(queryKey);

      if (previousLocations && Array.isArray(previousLocations)) {
        queryClient.setQueryData(
          queryKey,
          previousLocations.map((loc) =>
            loc._id === id ? { ...loc, ...payload } : loc
          )
        );
      }
      return { previousLocations };
    },
    onError: (err, variables, context) => {
      if (context?.previousLocations) {
        queryClient.setQueryData(queryKey, context.previousLocations);
      }
    },
    onSettled: (res) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.locations });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminLocations });
      if (res?.location?.slug) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.location(res.location.slug) });
      }
    },
    ...options,
  });
};

/** Hook: Admin delete location with 0ms optimistic removal */
export const useAdminDeleteLocation = (token, options = {}) => {
  const queryClient = useQueryClient();
  const queryKey = [...QUERY_KEYS.adminLocations, token];

  return useMutation({
    mutationFn: (id) => adminDeleteLocation(token, id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });
      const previousLocations = queryClient.getQueryData(queryKey);

      if (previousLocations && Array.isArray(previousLocations)) {
        queryClient.setQueryData(
          queryKey,
          previousLocations.filter((loc) => loc._id !== id)
        );
      }
      return { previousLocations };
    },
    onError: (err, id, context) => {
      if (context?.previousLocations) {
        queryClient.setQueryData(queryKey, context.previousLocations);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.locations });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminLocations });
    },
    ...options,
  });
};
