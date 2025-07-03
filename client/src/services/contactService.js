import ApiService from './api.js';

class ContactService {
  // Submit contact form
  async submitContact(contactData) {
    try {
      // Don't include token for public contact form
      const url = `${ApiService.baseURL}/contact`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
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

  // Get all contacts (Admin only)
  async getContacts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/contact${queryString ? `?${queryString}` : ''}`;
      return await ApiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Get single contact (Admin only)
  async getContact(id) {
    try {
      return await ApiService.get(`/contact/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Update contact status (Admin only)
  async updateContact(id, updateData) {
    try {
      return await ApiService.put(`/contact/${id}`, updateData);
    } catch (error) {
      throw error;
    }
  }

  // Delete contact (Admin only)
  async deleteContact(id) {
    try {
      return await ApiService.delete(`/contact/${id}`);
    } catch (error) {
      throw error;
    }
  }
}

export default new ContactService();
