import React, { useEffect, useState } from "react";
import supabase from "../config/SupaBase";

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

  // Filter based on user search (shop or product)
  const filteredShops = sortedShops.filter((shop) => {
    const shopMatch = shop.shop.toLowerCase().includes(search.toLowerCase());
    const productMatch =
      productsByShop[shop.id]?.some((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ) || false;

    return shopMatch || productMatch;
  });

  // Sort products alphabetically OR by level after search
  const getSortedProducts = (list) => {
    if (search.trim() === "") {
      // Default alphabetical sorting
      return list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // After search → sort by level DESC
      return list.sort((a, b) => b.level - a.level);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Shops & Products</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search shop or product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #888",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      />

      {filteredShops.map((shop) => (
        <div
          key={shop.id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            margin: "15px 0",
            borderRadius: "10px",
            background: "#f9f9f9",
          }}
        >
          <h3 style={{ marginBottom: 5 }}>{shop.shop}</h3>
          <p style={{ margin: "5px 0" }}>Contact: {shop.contact}</p>

          <img
            src={shop.logo}
            width="80"
            style={{ borderRadius: "8px", marginBottom: "10px" }}
          />

          <h4 style={{ marginTop: 10 }}>Products:</h4>

          {productsByShop[shop.id] ? (
            getSortedProducts(
              productsByShop[shop.id].filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
              )
            ).map((p) => (
              <div
                key={p.id}
                style={{
                  background: "#fff",
                  padding: "8px",
                  borderRadius: "6px",
                  margin: "5px 0",
                  border: "1px solid #ddd",
                }}
              >
                {p.name} - ₹{p.rate}
                {/* 👇 DO NOT SHOW LEVEL VALUE */}
              </div>
            ))
          ) : (
            <p>No products</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShopList;
