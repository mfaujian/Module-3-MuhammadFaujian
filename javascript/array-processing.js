const inventory = [
  { name: "MCB 2-Pole 32A",         category: "electrical", price: 85000,  qty: 40,  inStock: true  },
  { name: "Panel Enclosure 12-Way", category: "electrical", price: 850000, qty: 6,   inStock: true  },
  { name: "Copper Busbar 10mm",     category: "electrical", price: 120000, qty: 0,   inStock: false },
  { name: "Cable Duct 40x40",       category: "accessory",  price: 35000,  qty: 25,  inStock: true  },
  { name: "Terminal Block 10A",     category: "electrical", price: 12000,  qty: 200, inStock: true  },
];

// ---------- forEach: iterate, side effect (logging) ----------
console.log("Inventory items:");
inventory.forEach((item, index) => {
  console.log(`${index + 1}. ${item.name} — Rp ${item.price.toLocaleString("id-ID")}`);
});

// ---------- map: transform each item (apply a 10% discount) ----------
const discounted = inventory.map((item) => ({
  ...item,
  discountedPrice: Math.round(item.price * 0.9),
}));

document.getElementById("discounted-table").innerHTML = `
  <tr><th>Name</th><th>Original</th><th>Discounted (10%)</th></tr>
  ${discounted.map(i => `
    <tr>
      <td>${i.name}</td>
      <td>Rp ${i.price.toLocaleString("id-ID")}</td>
      <td>Rp ${i.discountedPrice.toLocaleString("id-ID")}</td>
    </tr>`).join("")}
`;

// ---------- filter: keep only in-stock electrical items ----------
const inStockElectrical = inventory.filter(
  (item) => item.inStock && item.category === "electrical"
);

document.getElementById("filtered-table").innerHTML = `
  <tr><th>Name</th><th>Qty</th><th>Price</th></tr>
  ${inStockElectrical.map(i => `
    <tr>
      <td>${i.name}</td>
      <td>${i.qty}</td>
      <td>Rp ${i.price.toLocaleString("id-ID")}</td>
    </tr>`).join("")}
`;

// ---------- reduce: aggregate total value + count per category ----------
const totalValue = inventory.reduce((sum, item) => sum + item.price * item.qty, 0);

const countByCategory = inventory.reduce((counts, item) => {
  counts[item.category] = (counts[item.category] || 0) + 1;
  return counts;
}, {});

document.getElementById("summary").innerHTML = `
  <p>Total inventory value: <strong>Rp ${totalValue.toLocaleString("id-ID")}</strong></p>
  <p>Items per category: <strong>${JSON.stringify(countByCategory)}</strong></p>
`;

console.log("Total inventory value:", totalValue, "| Per category:", countByCategory);