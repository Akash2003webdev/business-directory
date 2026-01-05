import React, { useEffect, useState } from "react";
import supabase from "../config/SupaBase";

// --- 1. Curated list of high-quality shop/bookstore images ---
const shopImages = [
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
];

// --- 2. Helper function to select a consistent random image based on Shop ID ---
const getRandomShopImage = (id) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % shopImages.length;
  return shopImages[index];
};

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: shopData } = await supabase.from("shops").select("*");
      const { data: productData } = await supabase.from("products").select("*");

      setShops(shopData || []);
      setProducts(productData || []);
    };

    fetchData();
  }, []);

  const productsByShop = products.reduce((acc, product) => {
    if (!acc[product.shop_id]) acc[product.shop_id] = [];
    acc[product.shop_id].push(product);
    return acc;
  }, {});

  let sortedShops = [...shops].sort((a, b) => a.shop.localeCompare(b.shop));

  if (search.trim() !== "") {
    sortedShops = [...shops].sort((a, b) => {
      const maxA = Math.max(
        ...(productsByShop[a.id]?.map((p) => p.level) || [0])
      );
      const maxB = Math.max(
        ...(productsByShop[b.id]?.map((p) => p.level) || [0])
      );
      return maxB - maxA;
    });
  }

  const filteredShops = sortedShops.filter((shop) => {
    const shopMatch = shop.shop.toLowerCase().includes(search.toLowerCase());
    const productMatch =
      productsByShop[shop.id]?.some((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ) || false;

    return shopMatch || productMatch;
  });

  const getSortedProducts = (list) => {
    if (search.trim() === "") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return list.sort((a, b) => b.level - a.level);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* --- SEARCH HEADER --- */}
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Explore Collection
        </h2>

        <div className="relative w-full max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for shops or products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* --- SHOPS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredShops.map((shop) => {
          const shopProducts = productsByShop[shop.id]
            ? getSortedProducts(
                productsByShop[shop.id].filter((p) =>
                  p.name.toLowerCase().includes(search.toLowerCase())
                )
              )
            : [];

          // Get consistent random image
          const displayImage = shop.logo || getRandomShopImage(shop.id);

          return (
            <div
              key={shop.id}
              className="group bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* --- 3. NEW SHOP IMAGE HEADER --- */}
              <div className="h-40 w-full relative overflow-hidden">
                <img
                  src={displayImage}
                  alt={shop.shop}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

                <div className="absolute bottom-4 left-5 text-white">
                  <h3 className="text-xl font-bold leading-tight shadow-sm mb-1">
                    {shop.shop}
                  </h3>
                  <div className="flex items-center text-slate-200 text-xs font-medium">
                    <span className="mr-1">📞</span>
                    {shop.contact || "No contact info"}
                  </div>
                </div>
              </div>

              {/* Products List */}
              <div className="p-5 bg-white flex-1">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex justify-between">
                  <span>Available Items</span>
                  <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                    {shopProducts.length}
                  </span>
                </h4>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                  {shopProducts.length > 0 ? (
                    shopProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100 transition-colors group/item"
                      >
                        <span className="text-sm font-medium text-slate-700 group-hover/item:text-indigo-700 truncate mr-2">
                          {p.name}
                        </span>
                        <span className="text-xs font-bold text-white bg-indigo-500 px-2.5 py-1 rounded-lg shadow-sm whitespace-nowrap">
                          ₹{p.rate}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-slate-400 text-sm italic border-2 border-dashed border-slate-100 rounded-xl">
                      No matching products found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredShops.length === 0 && (
        <div className="text-center py-20 opacity-60">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-slate-600">No results found</h3>
          <p className="text-slate-500">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
};

export default ShopList;
