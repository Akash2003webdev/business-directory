import React, { useEffect, useState } from "react";
import supabase from "../config/SupaBase";

const ShopandProduct = () => {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [newShopName, setNewShopName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: shopData } = await supabase.from("shops").select("*");
    const { data: productData } = await supabase.from("products").select("*");

    setShops(shopData || []);
    setProducts(productData || []);
  };

  // Group products under shops
  const productsByShop = products.reduce((acc, p) => {
    if (!acc[p.shop_id]) acc[p.shop_id] = [];
    acc[p.shop_id].push(p);
    return acc;
  }, {});

  // Search filter
  const filteredShops = shops.filter((shop) => {
    const shopMatch = shop.shop.toLowerCase().includes(search.toLowerCase());
    const productMatch =
      productsByShop[shop.id]?.some((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ) || false;

    return shopMatch || productMatch;
  });

  // CREATE SHOP
  const createShop = async () => {
    if (!newShopName.trim()) return alert("Enter shop name");
    const { data, error } = await supabase
      .from("shops")
      .insert([{ shop: newShopName }])
      .select();

    if (error) return alert(error.message);
    setShops([...shops, data[0]]);
    setNewShopName("");
  };

  // UPDATE SHOP
  const updateShop = async (id) => {
    const newName = prompt("Enter new shop name:");
    if (!newName) return;
    const { data, error } = await supabase
      .from("shops")
      .update({ shop: newName })
      .eq("id", id)
      .select();

    if (error) return alert(error.message);
    setShops(shops.map((s) => (s.id === id ? data[0] : s)));
  };

  // DELETE SHOP
  const deleteShop = async (id) => {
    if (!window.confirm("Delete shop?")) return;
    const { error } = await supabase.from("shops").delete().eq("id", id);
    if (error) return alert(error.message);
    setShops(shops.filter((s) => s.id !== id));
    setProducts(products.filter((p) => p.shop_id !== id));
  };

  // CREATE PRODUCT
  const createProduct = async (shop_id) => {
    const name = prompt("Product name:");
    const rate = prompt("Price:");
    if (!name || !rate) return;
    const { data, error } = await supabase
      .from("products")
      .insert([{ shop_id, name, rate }])
      .select();

    if (error) return alert(error.message);
    setProducts([...products, data[0]]);
  };

  // UPDATE PRODUCT
  const updateProduct = async (id) => {
    const name = prompt("New name:");
    const rate = prompt("New price:");
    if (!name || !rate) return;
    const { data, error } = await supabase
      .from("products")
      .update({ name, rate })
      .eq("id", id)
      .select();

    if (error) return alert(error.message);
    setProducts(products.map((p) => (p.id === id ? data[0] : p)));
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return alert(error.message);
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-white shadow-md mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1040/1040241.png"
              alt="logo"
              className="w-12 h-12"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            Business <span className="text-indigo-600">Directory</span>
          </h1>
          <p className="mt-2 text-slate-500">Manage your shops and inventories efficiently</p>
        </div>

        {/* --- CONTROLS SECTION (Search + Add Shop) --- */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-lg">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search for a shop or product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition outline-none bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Add Shop Form */}
          <div className="flex w-full md:w-auto gap-2">
            <input
              placeholder="New Shop Name"
              value={newShopName}
              onChange={(e) => setNewShopName(e.target.value)}
              className="flex-1 md:w-64 px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition outline-none"
            />
            <button
              onClick={createShop}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
            >
              <span>+</span> Add Shop
            </button>
          </div>
        </div>

        {/* --- SHOPS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden hover:translate-y-[-4px] transition-transform duration-300 flex flex-col"
            >
              {/* Shop Header */}
              <div className="bg-gradient-to-r from-slate-50 to-white p-5 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 break-words">
                    {shop.shop}
                  </h2>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    ID: {shop.id.toString().slice(0,4)}...
                  </span>
                </div>
                
                <div className="flex gap-1">
                  <button
                    onClick={() => updateShop(shop.id)}
                    className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition"
                    title="Edit Shop Name"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteShop(shop.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Delete Shop"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Product List */}
              <div className="p-5 flex-1 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                    Inventory
                  </h3>
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                    {productsByShop[shop.id]?.length || 0} items
                  </span>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                  {productsByShop[shop.id]?.length > 0 ? (
                    productsByShop[shop.id].map((p) => (
                      <div
                        key={p.id}
                        className="group flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-700">
                            {p.name}
                          </span>
                          <span className="text-sm text-indigo-600 font-medium">
                            ₹{p.rate}
                          </span>
                        </div>

                        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                          <button
                            onClick={() => updateProduct(p.id)}
                            className="p-1.5 bg-white text-gray-500 hover:text-indigo-600 rounded shadow-sm border border-gray-200"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 bg-white text-gray-500 hover:text-red-600 rounded shadow-sm border border-gray-200"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-slate-400 text-sm italic border-2 border-dashed border-slate-100 rounded-xl">
                      No products available
                    </div>
                  )}
                </div>
              </div>

              {/* Add Product Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => createProduct(shop.id)}
                  className="w-full py-2.5 rounded-xl border-2 border-dashed border-indigo-200 text-indigo-600 font-medium hover:bg-indigo-50 hover:border-indigo-300 transition flex justify-center items-center gap-2"
                >
                  <span>+</span> Add Product
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredShops.length === 0 && (
           <div className="text-center py-20">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-xl font-bold text-slate-600">No shops found</h3>
              <p className="text-slate-400">Try creating a new shop or adjust your search.</p>
           </div>
        )}

      </div>
    </div>
  );
};

export default ShopandProduct;