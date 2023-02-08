import http from "../http-common";

class ReceiptDataService {
  getAll() {
    return http.get("/receipts");
  }

  get(id) {
    return http.get(`/receipts/${id}`);
  }

  create(data) {
    return http.post("/receipts", data);
  }

  update(id, data) {
    return http.put(`/receipts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/receipts/${id}`);
  }

  deleteAll() {
    return http.delete(`/receipts`);
  }

  findByTitle(title) {
    return http.get(`/receipts?title=${title}`);
  }
}

export default new ReceiptDataService();