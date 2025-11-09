/**
 * store/orderStore.ts
 * Purpose: Zustand store to manage OrderInfo with API integration.
 * Combines local state management with remote API calls.
 */

import { create } from "zustand";
import { orderApi } from "../api/orderApi";
import {
  OrderInfo,
  PaymentStatus,
  ResourceStatus,
  PaymentType,
} from "../types/order";

/**
 * Create an empty order template with an optional cloned source.
 */
function createNewOrder(clone?: Partial<OrderInfo>): OrderInfo {
  return {
    order_info_Id: crypto.randomUUID(),
    orderno: clone?.orderno ?? "",
    productId: clone?.productId ?? "",
    packcode: clone?.packcode ?? "",
    licenseInfo: clone?.licenseInfo ?? {},
    order_date: clone?.order_date ?? new Date().toISOString().slice(0, 10),
    customer_name: clone?.customer_name ?? "",
    customer_address: clone?.customer_address ?? "",
    customer_type: clone?.customer_type ?? null,
    taxcode: clone?.taxcode ?? "",
    identity_code: clone?.identity_code ?? "",
    tel: clone?.tel ?? "",
    email: clone?.email ?? "",
    note: clone?.note ?? "",
    amount: clone?.amount ?? null,
    payment_status: clone?.payment_status ?? PaymentStatus.Unpaid,
    payment_tran_no: clone?.payment_tran_no ?? "",
    payment_type: clone?.payment_type ?? PaymentType.Cash,
    payment_date: clone?.payment_date ?? null,
    resource_status: clone?.resource_status ?? ResourceStatus.NotProvisioned,
    partner_code: clone?.partner_code ?? "",
    employee_code: clone?.employee_code ?? "",
  };
}

export interface OrderState {
  orders: OrderInfo[];
  selectedId: string | null;
  search: string;
  page: number;
  pageSize: number;
  total: number;
  loading: boolean;
  error: string | null;

  // API methods
  load: () => Promise<void>;
  reload: () => Promise<void>;
  setSearch: (q: string) => void;
  setPage: (p: number) => void;
  setPageSize: (n: number) => void;
  select: (id: string | null) => void;

  add: (data: Partial<OrderInfo>) => Promise<OrderInfo>;
  update: (id: string, patch: Partial<OrderInfo>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  duplicate: (id: string) => Promise<OrderInfo | null>;

  confirmPayment: (id: string) => Promise<void>;
  provisionResource: (id: string) => Promise<void>;

  importCSV: (file: File) => Promise<{ imported: number; total: number }>;
  exportCSV: () => Promise<Blob>;

  getSelected: () => OrderInfo | null;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  selectedId: null,
  search: "",
  page: 1,
  pageSize: 10,
  total: 0,
  loading: false,
  error: null,

  /**
   * Load orders from API with current filters
   */
  load: async () => {
    set({ loading: true, error: null });
    try {
      const { data, total } = await orderApi.getOrders({
        page: get().page,
        limit: get().pageSize,
        search: get().search,
      });
      
      set({ 
        orders: data, 
        total,
        loading: false 
      });
      
      // Auto-select first item if nothing selected
      const selectedId = get().selectedId;
      if (!selectedId && data.length) {
        set({ selectedId: data[0].order_info_Id });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Lỗi khi tải dữ liệu',
        loading: false 
      });
    }
  },

  /**
   * Reload current page
   */
  reload: async () => {
    await get().load();
  },

  /**
   * Update search query and reload
   */
  setSearch: (q) => {
    set({ search: q, page: 1 });
    get().load();
  },

  /**
   * Change page and reload
   */
  setPage: (p) => {
    set({ page: p });
    get().load();
  },

  /**
   * Change page size and reload
   */
  setPageSize: (n) => {
    set({ pageSize: n, page: 1 });
    get().load();
  },

  /**
   * Select an order by ID
   */
  select: (id) => set({ selectedId: id }),

  /**
   * Create new order
   */
  add: async (data) => {
    try {
      const newOrder = await orderApi.createOrder(data);
      set({ 
        orders: [newOrder, ...get().orders], 
        selectedId: newOrder.order_info_Id,
        total: get().total + 1
      });
      return newOrder;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Lỗi khi tạo đơn hàng'
      });
      throw error;
    }
  },

  /**
   * Update existing order
   */
  update: async (id, patch) => {
    try {
      const updatedOrder = await orderApi.updateOrder(id, patch);
      set({ 
        orders: get().orders.map((r) =>
          r.order_info_Id === id ? updatedOrder : r
        )
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Lỗi khi cập nhật đơn hàng'
      });
      throw error;
    }
  },

  /**
   * Delete order
   */
  remove: async (id) => {
    try {
      await orderApi.deleteOrder(id);
      const newOrders = get().orders.filter((r) => r.order_info_Id !== id);
      let selectedId = get().selectedId;
      if (selectedId === id) {
        selectedId = newOrders[0]?.order_info_Id ?? null;
      }
      set({ 
        orders: newOrders, 
        selectedId,
        total: get().total - 1
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Lỗi khi xóa đơn hàng'
      });
      throw error;
    }
  },

  /**
   * Duplicate existing order
   */
  duplicate: async (id) => {
    try {
      const duplicatedOrder = await orderApi.duplicateOrder(id);
      set({ 
        orders: [duplicatedOrder, ...get().orders],
        selectedId: duplicatedOrder.order_info_Id,
        total: get().total + 1
      });
      return duplicatedOrder;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Lỗi khi nhân bản đơn hàng'
      });
      throw error;
    }
  },

  /**
   * Confirm payment for order
   */
  confirmPayment: async (id) => {
    try {
      await orderApi.confirmPayment(id);
      set({ 
        orders: get().orders.map((r) =>
          r.order_info_Id === id 
            ? { ...r, payment_status: PaymentStatus.Paid, payment_date: new Date().toISOString() }
            : r
        )
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Lỗi khi xác nhận thanh toán'
      });
      throw error;
    }
  },

  /**
   * Provision resources for order
   */
  provisionResource: async (id) => {
    try {
      await orderApi.provisionResource(id);
      set({ 
        orders: get().orders.map((r) =>
          r.order_info_Id === id 
            ? { ...r, resource_status: ResourceStatus.Provisioned }
            : r
        )
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Lỗi khi cấp tài nguyên'
      });
      throw error;
    }
  },

  /**
   * Import orders from CSV file
   */
  importCSV: async (file) => {
    try {
      const result = await orderApi.importOrdersCSV(file);
      await get().load(); // Reload data
      return result;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Lỗi khi nhập khẩu đơn hàng'
      });
      throw error;
    }
  },

  /**
   * Export orders to CSV
   */
  exportCSV: async () => {
    try {
      return await orderApi.exportOrdersCSV();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Lỗi khi xuất khẩu đơn hàng'
      });
      throw error;
    }
  },

  /**
   * Get currently selected order
   */
  getSelected: () => {
    const id = get().selectedId;
    if (!id) return null;
    return get().orders.find((r) => r.order_info_Id === id) ?? null;
  },
}));
