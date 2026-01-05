import React, { useState, useEffect } from "react";
import { 
  Store, 
  Package, 
  Plus, 
  Trash2, 
  Edit2, 
  User, 
  Mail, 
  Calendar,
  Shield,
  Loader2
} from "lucide-react";
import supabase from "../config/SupaBase";

const CompanyDashboard = ({ user }) => {
  const [show, setShow] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [adding, setAdding] = useState(false);

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
    setAdding(true);

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
        fetchProductData();
      }
    } catch (err) {
      console.log("Add product error:", err);
    } finally {
      setAdding(false);
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
    <div className="min-h-screen flex bg-slate-50 relative overflow-hidden">
      
      {/* Background Decorative Elements (Consistent with Login/Register) */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-100 z-0"></div>
      <div className="absolute top-10 left-10 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl z-0"></div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 p-6 z-10 max-w-7xl mx-auto w-full">
        
        {/* SIDEBAR CARD */}
        <div className="w-full md:w-80 h-fit bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 p-6 flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-purple-500 mb-4 shadow-lg">
              <img
                src={user.imageUrl || "https://via.placeholder.com/150"}
                className="w-full h-full rounded-full object-cover border-4 border-white"
                alt="Profile"
              />
            </div>
            <div className="absolute bottom-4 right-0 bg-indigo-600 p-1.5 rounded-full border-2 border-white">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          
          <div className="mt-4 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide border border-indigo-100">
            {user.role} Account
          </div>

          <div className="w-full mt-6 border-t border-gray-100 pt-6 space-y-3 text-left">
             <div className="flex items-center text-gray-600 text-sm gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</span>
             </div>
             {companyData && (
                <div className="flex items-center text-gray-600 text-sm gap-3">
                   <Store className="w-4 h-4 text-gray-400" />
                   <span>Shop ID: #{companyData.id}</span>
                </div>
             )}
          </div>
        </div>

        {/* MAIN CONTENT CARD */}
        <div className="flex-1 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 p-8">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Store className="w-8 h-8 text-indigo-600" />
                {companyData ? companyData.shop : "Dashboard"}
              </h1>
              <p className="text-gray-500 mt-1">Manage your inventory and products</p>
            </div>
          </div>

          {/* ADD PRODUCT SECTION */}
          <div className="bg-indigo-50/50 rounded-xl p-6 border border-indigo-100 mb-8">
            <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Product
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="flex-1 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm text-gray-700"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                className="w-full md:w-40 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm text-gray-700"
              />
              <button
                onClick={addProduct}
                disabled={adding}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Product"}
              </button>
            </div>
          </div>

          {/* PRODUCTS LIST */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-400" />
              Inventory List
            </h3>

            {loadingProducts ? (
              <div className="text-center py-10 text-gray-500">Loading products...</div>
            ) : products.length > 0 ? (
              <div className="grid gap-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="group bg-white border border-gray-100 p-4 rounded-xl flex justify-between items-center hover:shadow-md transition-all hover:border-indigo-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-lg">{p.name}</p>
                        <p className="text-indigo-600 font-medium">₹ {p.rate}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateProduct(p.id)}
                        className="p-2 text-amber-500 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No products added yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;