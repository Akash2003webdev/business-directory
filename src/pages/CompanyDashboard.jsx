import React, { useState, useEffect } from "react";
import supabase from "../config/SupaBase";

const CompanyDashboard = ({ user }) => {
  const [show, setShow] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");

  // Fetch company/shop data on mount
  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const { data, error } = await supabase
        .from("shops")
        .select("*")
        .eq("shop", user.name)
        .single();

      if (!error && data) setCompanyData(data);
    } catch (err) {
      console.log("Unexpected error:", err);
    }
  };

  // Fetch products whenever companyData changes
  useEffect(() => {
    if (companyData) fetchProductData();
  }, [companyData]);

  const fetchProductData = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("shop_id", companyData.id);

      if (!error) setProducts(Array.isArray(data) ? data : []);
      setLoadingProducts(false);
    } catch (err) {
      console.log("Product fetch error:", err);
      setLoadingProducts(false);
    }
  };

  // Add product
  const addProduct = async () => {
    if (!newProductName || !newProductPrice) return alert("Fill all fields");

    try {
      const { data, error } = await supabase.from("products").insert([
        {
          name: newProductName,
          rate: newProductPrice,
          shop_id: companyData.id,
        },
      ]);

      if (!error) {
        setNewProductName("");
        setNewProductPrice("");

        // 🔄 Reload products from database
        fetchProductData();
      }
    } catch (err) {
      console.log("Add product error:", err);
    }
  };

  // Update product
  const updateProduct = async (id) => {
    const newName = prompt("Enter new product name:");
    const newPrice = prompt("Enter new product price:");
    if (!newName || !newPrice) return;

    try {
      const { data, error } = await supabase
        .from("products")
        .update({ name: newName, rate: newPrice })
        .eq("id", id);

      if (!error) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, name: newName, rate: newPrice } : p
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (!error) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 mt-6">
      {/* SIDEBAR */}
      <div className="w-72 bg-white shadow-xl p-6">
        <div className="text-center">
          <img
            src={user.imageUrl || "https://via.placeholder.com/100"}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-500"
            alt="Company"
          />
          <h1 className="text-2xl font-bold text-green-700 mb-2">
            Company Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome, <span className="text-green-600">{user.name}</span>
          </p>
          <p className="bg-green-100 text-green-700 px-3 py-1 rounded-md inline-block mt-3">
            Role: {user.role}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Company Details
          </h2>
          <div className="space-y-3">
            {companyData && (
              <p>
                <strong>Company ID:</strong> {companyData.id}
              </p>
            )}
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Owner Name:</strong> {user.name}
            </p>
            <p>
              <strong>Registered On:</strong> {user.createdAt || "N/A"}
            </p>

            {companyData ? (
              <>
                <p>
                  <strong>Shop Name:</strong> {companyData.shop}
                </p>
                <p>
                  <strong>Shop ID:</strong> {companyData.id}
                </p>
              </>
            ) : (
              <p className="text-gray-400">Loading company/shop data...</p>
            )}
          </div>

          <hr className="my-4" />

          <h3 className="text-xl font-bold text-green-700 mb-2">Products</h3>

          {/* ADD PRODUCT FORM */}
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
              className="border p-2 rounded w-32"
            />
            <button
              onClick={addProduct}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {/* PRODUCTS LIST */}
          {loadingProducts ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            <ul className="space-y-2">
              {products.map((p) => (
                <li
                  key={p.id}
                  className="border p-3 rounded flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Name:</strong> {p.name}
                    </p>
                    <p>
                      <strong>Price:</strong> ${p.rate}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => updateProduct(p.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No products found.</p>
          )}

          <hr className="my-4" />

         
        </div>
      </div>

      {/* EDIT FORM MODAL */}
      {show && (
        <div className="fixed top-0 right-0 w-96 bg-white shadow-2xl p-6 h-full z-50">
          <h3 className="text-xl font-bold mb-4">Edit Company</h3>
          {/* Add form fields to edit company data here */}
          <button
            onClick={() => setShow(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
