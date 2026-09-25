import { products, categories } from "./data.js";
import type { Product, Availability } from "./types.js";

const grid = document.getElementById("product-grid") as HTMLDivElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const cartCountEl = document.getElementById("cart-count") as HTMLSpanElement;

let cartCount = 0;

// Derived from the real schema's stock/isActive — not stored directly
function getAvailability(product: Product): Availability {
  if (!product.isActive || product.stock === 0) return "out-of-stock";
  if (product.stock <= 5) return "low-stock";
  return "in-stock";
}

function availabilityBadgeClasses(status: Availability): string {
  switch (status) {
    case "in-stock": return "bg-green-100 text-green-700";
    case "low-stock": return "bg-amber-100 text-amber-700";
    case "out-of-stock": return "bg-red-100 text-red-700";
  }
}

function categoryName(categoryId: number): string {
  return categories.find((c) => c.id === categoryId)?.name ?? "Uncategorized";
}

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

function renderProducts(list: Product[]): void {
  grid.innerHTML = "";

  list.forEach((product) => {
    const availability = getAvailability(product);
    const isOutOfStock = availability === "out-of-stock";

    const card = document.createElement("article");
    card.className = "bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-2 shadow-sm";

    card.innerHTML = `
      <div class="flex justify-between items-start">
        <h3 class="font-semibold text-slate-800">${product.name}</h3>
        <span class="text-xs px-2 py-1 rounded-full ${availabilityBadgeClasses(availability)}">
          ${availability.replace(/-/g, " ")}
        </span>
      </div>
      <p class="text-sm text-slate-500">${categoryName(product.categoryId)}</p>
      <p class="text-lg font-bold text-brand">${formatRupiah(product.price)}</p>
    `;

    const addBtn = document.createElement("button");
    addBtn.textContent = isOutOfStock ? "Out of stock" : "Add to cart";
    addBtn.disabled = isOutOfStock;
    addBtn.className = isOutOfStock
      ? "mt-2 bg-slate-200 text-slate-400 text-sm font-medium py-2 rounded-md cursor-not-allowed"
      : "mt-2 bg-brand text-white text-sm font-medium py-2 rounded-md hover:bg-slate-800 transition";

    addBtn.addEventListener("click", () => {
      cartCount++;
      cartCountEl.textContent = String(cartCount);
    });

    card.appendChild(addBtn);
    grid.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  renderProducts(products.filter((p) => p.name.toLowerCase().includes(query)));
});

renderProducts(products);