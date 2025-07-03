import ApiService from './api.js';

class AuthService {
  // Register new user
  async register(userData) {
    try {
      const response = await ApiService.post('/auth/register', userData);
      if (response.success && response.token) {
        ApiService.setToken(response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Login user
  async login(email, password) {
    try {
      const response = await ApiService.post('/auth/login', { email, password });
      if (response.success && response.token) {
        ApiService.setToken(response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout() {
    try {
      await ApiService.get('/auth/logout');
      ApiService.setToken(null);
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      // Even if API call fails, clear local storage
      ApiService.setToken(null);
      localStorage.removeItem('user');
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await ApiService.get('/auth/me');
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Update user details
  async updateDetails(userData) {
    try {
      const response = await ApiService.put('/auth/updatedetails', userData);
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Update password
  async updatePassword(currentPassword, newPassword) {
    try {
      const response = await ApiService.put('/auth/updatepassword', {
        currentPassword,
        newPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Check if user is logged in
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  // Get current user from localStorage
  getCurrentUserFromStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();
