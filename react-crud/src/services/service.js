import http from "../http-common";

const getAll = () => {
  return http.get("/receipts");
};

const get = id => {
  return http.get(`/receipts/${id}`);
};

const create = data => {
  return http.post("/receipts", data);
  //create QR code
};

const update = (id, data) => {
  return http.put(`/receipts/${id}`, data);
};

const remove = id => {
  return http.delete(`/receipts/${id}`);
};

const removeAll = () => {
  return http.delete(`/receipts`);
};

const findByTitle = title => {
  return http.get(`/receipts?title=${title}`);
};

const ReceiptDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default ReceiptDataService;