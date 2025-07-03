// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;

    this.token = this.getStoredToken();
  }

  // Safely get token from localStorage
  getStoredToken() {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.warn('localStorage not available:', error);
      return null;
    }
  }

  // Set authorization token
  setToken(token) {
    this.token = token;
    try {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.warn('localStorage not available:', error);
    }
  }

  // Get authorization headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    // Validate endpoint
    if (!endpoint || typeof endpoint !== 'string') {
      throw new Error('Valid endpoint is required');
    }

    // Ensure endpoint starts with /
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseURL}${normalizedEndpoint}`;
    
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response types
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else if (contentType && contentType.includes('text/')) {
        data = await response.text();
      } else {
        data = await response.blob();
      }

      if (!response.ok) {
        // Handle different error response formats
        const errorMessage = typeof data === 'object' && data.message 
          ? data.message 
          : typeof data === 'string' 
            ? data 
            : `HTTP Error: ${response.status} ${response.statusText}`;
        
        const error = new Error(errorMessage);
        error.status = response.status;
        error.statusText = response.statusText;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      // Network or other errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Please check your internet connection');
      }
      
      console.error('API Request Error:', {
        url,
        method: config.method || 'GET',
        error: error.message,
        status: error.status
      });
      
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    let url = endpoint;
    
    // Add query parameters if provided
    if (Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
      url += `?${searchParams.toString()}`;
    }
    
    return this.request(url);
  }

  // POST request
  async post(endpoint, data) {
    // Validate data
    if (data === null || data === undefined) {
      throw new Error('POST request requires data');
    }
    
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    // Validate data
    if (data === null || data === undefined) {
      throw new Error('PUT request requires data');
    }
    
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // PATCH request
  async patch(endpoint, data) {
    // Validate data
    if (data === null || data === undefined) {
      throw new Error('PATCH request requires data');
    }
    
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // POST request with FormData (for file uploads)
  async postFormData(endpoint, formData) {
    // Validate inputs
    if (!endpoint || typeof endpoint !== 'string') {
      throw new Error('Valid endpoint is required');
    }
    
    if (!(formData instanceof FormData)) {
      throw new Error('FormData instance is required');
    }

    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseURL}${normalizedEndpoint}`;
    const headers = {};

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      // Handle different response types
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else if (contentType && contentType.includes('text/')) {
        data = await response.text();
      } else {
        data = await response.blob();
      }

      if (!response.ok) {
        const errorMessage = typeof data === 'object' && data.message 
          ? data.message 
          : typeof data === 'string' 
            ? data 
            : `HTTP Error: ${response.status} ${response.statusText}`;
        
        const error = new Error(errorMessage);
        error.status = response.status;
        error.statusText = response.statusText;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Please check your internet connection');
      }
      
      console.error('API FormData Request Error:', {
        url,
        error: error.message,
        status: error.status
      });
      
      throw error;
    }
  }

  // Utility method to check if API is available
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return response.ok;
    } catch (error) {
      console.warn('API health check failed:', error);
      return false;
    }
  }

  // Clear token and logout
  logout() {
    this.setToken(null);
  }

  // Get current token
  getToken() {
    return this.token;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }
}

export default new ApiService();
