const API_BASE_URL = 'http://localhost:5000/api';

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
