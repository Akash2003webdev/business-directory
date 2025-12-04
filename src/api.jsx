import axios from "axios";

const api = axios.create({
  baseURL: "https://signpost-backend.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use((res) => {
  console.log(res.data);
  return res;
});
export default api;

import supabase from "./config/SupaBase";

// =========================
// SHOPS CRUD
// =========================

// CREATE shop
export const createShop = async (shop) => {
  const { data, error } = await supabase.from("shops").insert(shop).select();
  if (error) throw error;
  return data[0];
};

// READ all shops
export const getShops = async () => {
  const { data, error } = await supabase.from("shops").select("*");
  if (error) throw error;
  return data;
};

// UPDATE shop
export const updateShop = async (id, updates) => {
  const { data, error } = await supabase
    .from("shops")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
};

// DELETE shop
export const deleteShop = async (id) => {
  const { error } = await supabase.from("shops").delete().eq("id", id);
  if (error) throw error;
  return true;
};

// =========================
// PRODUCTS CRUD
// =========================

// CREATE product
export const createProduct = async (product) => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select();
  if (error) throw error;
  return data[0];
};

// READ all products
export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return data;
};

// UPDATE product
export const updateProduct = async (id, updates) => {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
};

// DELETE product
export const deleteProduct = async (id) => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
  return true;
};
