const API_BASE_URL = 'http://localhost:5000/api';

// Fetch Contact Config (GET /api/contact)
export const fetchContactConfig = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`);
    return await res.json();
  } catch (error) {
    console.warn('API Error fetchContactConfig:', error);
    return { success: false, message: 'Backend server is offline' };
  }
};

// Update Contact Config (PUT /api/contact)
export const updateContactConfig = async (contactData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error updateContactConfig:', error);
    return { success: false, message: 'Backend server is offline' };
  }
};

// Fetch Enquiries (GET /api/contact/message)
export const fetchEnquiries = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/message`);
    return await res.json();
  } catch (error) {
    console.warn('API Error fetchEnquiries:', error);
    return { success: false, message: 'Backend server is offline' };
  }
};

// Mark Enquiry as Read (PUT /api/contact/message/:id/read)
export const markEnquiryRead = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/message/${id}/read`, {
      method: 'PUT'
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error markEnquiryRead:', error);
    return { success: false, message: 'Backend server is offline' };
  }
};

// Delete Enquiry (DELETE /api/contact/message/:id)
export const deleteEnquiry = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/message/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error deleteEnquiry:', error);
    return { success: false, message: 'Backend server is offline' };
  }
};

// Fetch Partner Config (GET /api/partners)
export const fetchPartnerConfig = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/partners`);
    return await res.json();
  } catch (error) {
    console.warn('API Error fetchPartnerConfig:', error);
    return { success: false, message: 'Backend server is offline' };
  }
};

// Update Partner Config (PUT /api/partners)
export const updatePartnerConfig = async (partnerData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/partners`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partnerData)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error updatePartnerConfig:', error);
    return { success: false, message: 'Backend server is offline' };
  }
};

// Fetch Stats Config (GET /api/stats)
export const fetchStatsConfig = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/stats`);
    return await res.json();
  } catch (error) {
    console.warn('API Error fetchStatsConfig:', error);
    return { success: false, message: 'Backend server is offline' };
  }
};

// Update Stats Config (PUT /api/stats)
export const updateStatsConfig = async (statsData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/stats`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(statsData)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error updateStatsConfig:', error);
    return { success: false, message: 'Backend server is offline' };
  }
};

// Fetch About Config (GET /api/about)
export const fetchAboutConfig = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/about`);
    return await res.json();
  } catch (error) {
    console.warn('API Error fetchAboutConfig:', error);
    return { success: false, message: 'Backend server is offline' };
  }
};

// Update About Config (PUT /api/about)
export const updateAboutConfig = async (aboutData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/about`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aboutData)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error updateAboutConfig:', error);
    return { success: false, message: 'Backend server is offline' };
  }
};

// Fetch Section 6 Config (GET /api/section6)
export const fetchSection6Config = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/section6`);
    return await res.json();
  } catch (error) {
    console.warn('API Error fetchSection6Config:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Update Section 6 Config (PUT /api/section6)
export const updateSection6Config = async (sec6Data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/section6`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sec6Data)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error updateSection6Config:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Fetch Section 5 Config (GET /api/section5)
export const fetchSection5Config = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/section5`);
    return await res.json();
  } catch (error) {
    console.warn('API Error fetchSection5Config:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Update Section 5 Config (PUT /api/section5)
export const updateSection5Config = async (sec5Data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/section5`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sec5Data)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error updateSection5Config:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Fetch Section 4 Config (GET /api/section4)
export const fetchSection4Config = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/section4`);
    return await res.json();
  } catch (error) {
    console.warn('API Error fetchSection4Config:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Update Section 4 Config (PUT /api/section4)
export const updateSection4Config = async (sec4Data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/section4`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sec4Data)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error updateSection4Config:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Fetch Section 3 Config (GET /api/section3)
export const fetchSection3Config = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/section3`);
    return await res.json();
  } catch (error) {
    console.warn('API Error fetchSection3Config:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Update Section 3 Config (PUT /api/section3)
export const updateSection3Config = async (sec3Data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/section3`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sec3Data)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error updateSection3Config:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Fetch Section 2 Config (GET /api/section2)
export const fetchSection2Config = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/section2`);
    return await res.json();
  } catch (error) {
    console.warn('API Error fetchSection2Config:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Update Section 2 Config (PUT /api/section2)
export const updateSection2Config = async (sec2Data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/section2`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sec2Data)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error updateSection2Config:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Fetch Hero Config (GET /api/hero)
export const fetchHeroConfig = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/hero`);
    return await res.json();
  } catch (error) {
    console.warn('API Error fetchHeroConfig:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Update Hero Config (PUT /api/hero)
export const updateHeroConfig = async (heroData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/hero`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(heroData)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error updateHeroConfig:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Fetch Header Config (GET)
export const fetchHeaderConfig = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/header`);
    return await res.json();
  } catch (error) {
    console.warn('API Error fetchHeaderConfig:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Update Header Config (PUT)
export const updateHeaderConfig = async (headerData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/header`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(headerData)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error updateHeaderConfig:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Reset / Delete Header Config (DELETE)
export const deleteHeaderConfig = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/header`, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error deleteHeaderConfig:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Fetch all users
export const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/users`);
    if (!res.ok) {
      const errText = await res.text();
      return { success: false, message: `Server error (${res.status}): ${errText}` };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('API Error fetchUsers:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Create / Register new user
export const createUser = async (userData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error createUser:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Auth: Register User
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error registerUser:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Auth: Login User
export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error loginUser:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Auth: Logout User
export const logoutUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST'
    });
    return await res.json();
  } catch (error) {
    return { success: true };
  }
};

// Update user details (Edit User)
export const updateUserDetails = async (id, updatedData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error updateUserDetails:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};

// Delete user
export const deleteUserById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (error) {
    console.warn('API Error deleteUserById:', error);
    return { success: false, message: 'Backend server is offline or unreachable' };
  }
};
