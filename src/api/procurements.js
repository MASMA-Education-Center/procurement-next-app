import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProcurements = async () => {
  const response = await axios.get(`${API_URL}/procurements`);
  return response.data;
};

export const searchProcurements = async (query) => {
  const response = await axios.get(
    `${API_URL}/procurements/search?query=${query}`
  );
  return response.data;
};

export const addProcurement = async (formData) => {
  const response = await axios.post(`${API_URL}/procurement`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProcurement = async (id, formData) => {
  const response = await axios.put(`${API_URL}/procuremens/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProcurement = async (id) => {
  await axios.delete(`${API_URL}/procurementquery/${id}`);
};
