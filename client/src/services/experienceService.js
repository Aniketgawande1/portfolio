import ApiService from './api.js';

class ExperienceService {
  // Get all experiences
  async getExperiences(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/experiences${queryString ? `?${queryString}` : ''}`;
      return await ApiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Get current experiences
  async getCurrentExperiences() {
    try {
      return await ApiService.get('/experiences/current');
    } catch (error) {
      throw error;
    }
  }

  // Get single experience
  async getExperience(id) {
    try {
      return await ApiService.get(`/experiences/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Create new experience
  async createExperience(experienceData) {
    try {
      return await ApiService.post('/experiences', experienceData);
    } catch (error) {
      throw error;
    }
  }

  // Update experience
  async updateExperience(id, experienceData) {
    try {
      return await ApiService.put(`/experiences/${id}`, experienceData);
    } catch (error) {
      throw error;
    }
  }

  // Delete experience
  async deleteExperience(id) {
    try {
      return await ApiService.delete(`/experiences/${id}`);
    } catch (error) {
      throw error;
    }
  }
}

export default new ExperienceService();
