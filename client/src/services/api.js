const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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
 * Admin: Verify token
 * @param {string} token
 * @returns {Promise<boolean>}
 */
export const verifyToken = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
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
