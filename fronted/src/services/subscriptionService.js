import api from "../api/api";

export const subscriptionService = {
  async getUserSubscription() {
    const response = await api.get("/api/subscription/user");
    return response.data;
  },

  async upgradeSubscription(planType) {
    // planType: FREE, MONTHLY, ANNUALLY
    const response = await api.patch("/api/subscription/upgrade", null, {
      params: { planType },
    });
    return response.data;
  },

  async createPaymentLink(planType) {
    const response = await api.post(`/api/payments/${planType}`);
    return response.data; // { payment_link_url, payment_link_id }
  },
};
