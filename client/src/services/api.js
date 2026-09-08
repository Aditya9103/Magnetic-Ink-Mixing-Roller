const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Submit a "Get a Quote" form request
 * @param {Object} payload - Form data
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const submitQuote = async (payload) => {
  const res = await fetch(`${BASE_URL}/forms/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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
  const res = await fetch(`${BASE_URL}/forms/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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
 * @param {{ type?: string, isRead?: boolean, page?: number, limit?: number }} params
 */
export const fetchSubmissions = async (token, params = {}) => {
  const query = new URLSearchParams();
  if (params.type) query.set("type", params.type);
  if (params.isRead !== undefined) query.set("isRead", params.isRead);
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
