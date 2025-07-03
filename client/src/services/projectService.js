import ApiService from './api.js';

class ProjectService {
  // Get all projects
  async getProjects(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/projects${queryString ? `?${queryString}` : ''}`;
      return await ApiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Get featured projects
  async getFeaturedProjects() {
    try {
      return await ApiService.get('/projects/featured');
    } catch (error) {
      throw error;
    }
  }

  // Get single project
  async getProject(id) {
    try {
      return await ApiService.get(`/projects/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Create new project
  async createProject(projectData, images = []) {
    try {
      const formData = new FormData();
      
      // Add project data
      Object.keys(projectData).forEach(key => {
        if (Array.isArray(projectData[key])) {
          projectData[key].forEach(item => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, projectData[key]);
        }
      });

      // Add images
      images.forEach(image => {
        formData.append('images', image);
      });

      return await ApiService.postFormData('/projects', formData);
    } catch (error) {
      throw error;
    }
  }

  // Update project
  async updateProject(id, projectData, images = []) {
    try {
      const formData = new FormData();
      
      // Add project data
      Object.keys(projectData).forEach(key => {
        if (Array.isArray(projectData[key])) {
          projectData[key].forEach(item => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, projectData[key]);
        }
      });

      // Add images if provided
      if (images.length > 0) {
        images.forEach(image => {
          formData.append('images', image);
        });
      }

      const url = `${ApiService.baseURL}/projects/${id}`;
      const headers = {};

      if (ApiService.token) {
        headers.Authorization = `Bearer ${ApiService.token}`;
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Delete project
  async deleteProject(id) {
    try {
      return await ApiService.delete(`/projects/${id}`);
    } catch (error) {
      throw error;
    }
  }
}

export default new ProjectService();
