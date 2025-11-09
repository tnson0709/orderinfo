/**
 * api/orderApi.ts
 * Purpose: API service layer for order management using native fetch.
 * Handles all HTTP requests to the PHP backend.
 */

import { OrderInfo } from '../types/order';

// Configure base API settings
const API_BASE_URL = 'http://localhost/api/api-order/rest-api/api';
const API_TIMEOUT = 10000; // 10 seconds timeout

/**
 * Generic fetch wrapper with error handling and timeout
 */
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  try {
    console.log(`API Request: ${options.method || 'GET'} ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`API Response: ${options.method || 'GET'} ${url} - ${response.status}`);
    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
    
    throw new Error('Unknown error occurred');
  }
}

/**
 * Order API interface defining all available methods
 */
export interface OrderApiService {
  // Order list operations
  getOrders: (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => Promise<{ data: OrderInfo[]; total: number; page: number; limit: number }>;
  
  createOrder: (orderData: Partial<OrderInfo>) => Promise<OrderInfo>;
  
  // Individual order operations
  getOrder: (id: string) => Promise<OrderInfo>;
  updateOrder: (id: string, orderData: Partial<OrderInfo>) => Promise<OrderInfo>;
  deleteOrder: (id: string) => Promise<void>;
  
  // Special actions
  duplicateOrder: (id: string) => Promise<OrderInfo>;
  confirmPayment: (id: string) => Promise<void>;
  provisionResource: (id: string) => Promise<void>;
  
  // Export operations
  exportOrdersCSV: () => Promise<Blob>;
  importOrdersCSV: (csvFile: File) => Promise<{ imported: number; total: number }>;
}

/**
 * OrderApiService implementation
 */
export const orderApi: OrderApiService = {
  /**
   * Fetch orders with pagination and search
   */
  async getOrders(params = {}) {
    const { page = 1, limit = 10, search = '' } = params;
    
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search
      }).toString();
      
      const response = await apiRequest<any>(`/orders.php?${queryParams}`);
      
      return {
        data: response.data.data || [], // Adjusted to match new structure
        total: response.data.pagination.total || 0,
        page: response.data.pagination.page || page,
        limit: response.data.pagination.limit || limit
      };
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw new Error('Không thể tải danh sách đơn hàng');
    }
  },

  /**
   * Create a new order
   */
  async createOrder(orderData: Partial<OrderInfo>) {
    try {
      const response = await apiRequest<any>('/orders.php', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw new Error('Không thể tạo đơn hàng mới');
    }
  },

  /**
   * Get order details by ID
   */
  async getOrder(id: string) {
    try {
      const response = await apiRequest<any>(`/order.php/${encodeURIComponent(id)}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get order:', error);
      throw new Error('Không thể tải thông tin đơn hàng');
    }
  },

  /**
   * Update existing order
   */
  async updateOrder(id: string, orderData: Partial<OrderInfo>) {
    try {
      const response = await apiRequest<any>(`/order.php/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(orderData)
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update order:', error);
      throw new Error('Không thể cập nhật đơn hàng');
    }
  },

  /**
   * Delete order by ID
   */
  async deleteOrder(id: string) {
    try {
      await apiRequest<void>(`/order.php/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Failed to delete order:', error);
      throw new Error('Không thể xóa đơn hàng');
    }
  },

  /**
   * Duplicate an existing order
   */
  async duplicateOrder(id: string) {
    try {
      const response = await apiRequest<any>(`/order.php/${encodeURIComponent(id)}`, {
        method: 'POST',
        body: JSON.stringify({ action: 'duplicate' })
      });
      return response.data;
    } catch (error) {
      console.error('Failed to duplicate order:', error);
      throw new Error('Không thể nhân bản đơn hàng');
    }
  },

  /**
   * Confirm payment for an order
   */
  async confirmPayment(id: string) {
    try {
      await apiRequest<void>(`/order.php/${encodeURIComponent(id)}`, {
        method: 'POST',
        body: JSON.stringify({ action: 'confirm_payment' })
      });
    } catch (error) {
      console.error('Failed to confirm payment:', error);
      throw new Error('Không thể xác nhận thanh toán');
    }
  },

  /**
   * Provision resources for an order
   */
  async provisionResource(id: string) {
    try {
      await apiRequest<void>(`/order.php/${encodeURIComponent(id)}`, {
        method: 'POST',
        body: JSON.stringify({ action: 'provision_resource' })
      });
    } catch (error) {
      console.error('Failed to provision resource:', error);
      throw new Error('Không thể cấp tài nguyên');
    }
  },

  /**
   * Export orders to CSV
   */
  async exportOrdersCSV() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

      console.log(`API Request: GET ${API_BASE_URL}/export.php`);
      
      const response = await fetch(`${API_BASE_URL}/export.php`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Accept': 'text/csv',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();
      console.log(`API Response: GET ${API_BASE_URL}/export - ${response.status}`);
      return blob;
    } catch (error) {
      console.error('Failed to export orders:', error);
      throw new Error('Không thể xuất khẩu đơn hàng');
    }
  },

  /**
   * Import orders from CSV file
   */
  async importOrdersCSV(csvFile: File) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

      const formData = new FormData();
      formData.append('file', csvFile);
      
      console.log(`API Request: POST ${API_BASE_URL}/import`);
      
      const response = await fetch(`${API_BASE_URL}/import`, {
        method: 'POST',
        signal: controller.signal,
        body: formData,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`API Response: POST ${API_BASE_URL}/import - ${response.status}`);
      return data.data;
    } catch (error) {
      console.error('Failed to import orders:', error);
      throw new Error('Không thể nhập khẩu đơn hàng');
    }
  }
};

/**
 * Export a singleton instance for easy usage
 */
export default orderApi;
