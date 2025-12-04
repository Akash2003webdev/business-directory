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
    <div style={styles.container}>
      {/* LOGO */}
      <div style={styles.logoContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1040/1040241.png"
          alt="logo"
          style={styles.logo}
        />
        <h1 style={styles.title}>Business Book Directory</h1>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search shop or product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchBox}
      />

      {/* ADD SHOP */}
      <div style={styles.addShopRow}>
        <input
          placeholder="New Shop Name"
          value={newShopName}
          onChange={(e) => setNewShopName(e.target.value)}
          style={styles.input}
        />

        <button style={styles.addBtn} onClick={createShop}>
          + Add Shop
        </button>
      </div>

      {/* SHOPS LIST */}
      {filteredShops.map((shop) => (
        <div key={shop.id} style={styles.card}>
          <div style={styles.shopHeader}>
            <h2 style={styles.shopName}>{shop.shop}</h2>

            <div>
              <button
                style={styles.editBtn}
                onClick={() => updateShop(shop.id)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteShop(shop.id)}
              >
                Delete
              </button>
            </div>
          </div>

          <h3 style={styles.productTitle}>Products</h3>

          {/* PRODUCTS */}
          {productsByShop[shop.id]?.length > 0 ? (
            productsByShop[shop.id].map((p) => (
              <div key={p.id} style={styles.productItem}>
                <span>
                  {p.name} — ₹{p.rate}
                </span>

                <div>
                  <button
                    style={styles.smallEditBtn}
                    onClick={() => updateProduct(p.id)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.smallDeleteBtn}
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products</p>
          )}

          {/* ADD PRODUCT */}
          <button
            style={styles.addProductBtn}
            onClick={() => createProduct(shop.id)}
          >
            + Add Product
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShopandProduct;

// -------------------------------------------
// STYLES
// -------------------------------------------
const styles = {
  container: {
    padding: 20,
    maxWidth: 900,
    margin: "auto",
  },

  logoContainer: {
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    margin: 0,
  },

  searchBox: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ccc",
    marginBottom: 20,
  },

  addShopRow: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #bbb",
  },

  addBtn: {
    background: "#007bff",
    color: "white",
    padding: "12px 20px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 14,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: 20,
  },

  shopHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  shopName: {
    margin: 0,
  },

  editBtn: {
    padding: "6px 12px",
    marginRight: 8,
    borderRadius: 8,
    background: "#ffc107",
    border: "none",
    color: "#333",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "6px 12px",
    borderRadius: 8,
    background: "#e63946",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  productTitle: {
    marginTop: 15,
  },

  productItem: {
    display: "flex",
    justifyContent: "space-between",
    background: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    border: "1px solid #eee",
  },

  smallEditBtn: {
    marginRight: 10,
    padding: "4px 10px",
    background: "#6a994e",
    color: "white",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
  },

  smallDeleteBtn: {
    padding: "4px 10px",
    background: "#d62828",
    color: "white",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
  },

  addProductBtn: {
    marginTop: 10,
    padding: "8px 14px",
    background: "#1d3557",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
};
