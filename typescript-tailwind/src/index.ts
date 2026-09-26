// ===== 1. The type data layer =====
type Availability = "in-stock" | "sold-out";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  availability: Availability;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// ===== 2. Typed data =====
const products: Product[] = [
  { id: 1, name: "MCB 2-Pole 32A", category: "Electrical", price: 85000, stock: 40, availability: "in-stock" },
  { id: 2, name: "Panel Enclosure 12-Way", category: "Electrical", price: 850000, stock: 4, availability: "in-stock" },
  { id: 3, name: "Copper Busbar 10mm", category: "Electrical", price: 120000, stock: 0, availability: "sold-out" },
  { id: 4, name: "Cable Duct 40x40", category: "Accessory", price: 35000, stock: 25, availability: "in-stock" },
  { id: 5, name: "Terminal Block 10A", category: "Electrical", price: 12000, stock: 0, availability: "sold-out" },
  { id: 6, name: "MCCB 3P 100A", category: "Electrical", price: 1450000, stock: 3, availability: "in-stock" },
];

// ===== 3. Cart logic =====
let cart: CartItem[] = [];

function addToCart(product: Product): void {
  const existing = cart.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  renderCartSummary();
}

function getCartTotals(): { items: number; total: number } {
  return cart.reduce(
    (totals, item) => ({
      items: totals.items + item.quantity,
      total: totals.total + item.product.price * item.quantity,
    }),
    { items: 0, total: 0 }
  );
}

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

// ===== 4. Conditional classes  =====
function badgeClasses(status: Availability): string {
  return status === "in-stock" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
}

// ===== 5. Building a block =====
function createProductCard(product: Product): HTMLElement {
  const card = document.createElement("article");
  card.className = "bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-2 shadow-sm";

  card.innerHTML = `
    <div class="flex justify-between items-start">
      <span class="text-xs px-2 py-1 rounded-full ${badgeClasses(product.availability)}">
        ${product.availability === "in-stock" ? "In stock" : "Sold out"}
      </span>
      <span class="text-xs text-slate-400">${product.category}</span>
    </div>
    <h3 class="font-semibold text-slate-800">${product.name}</h3>
    <p class="text-lg font-bold text-brand">${formatRupiah(product.price)}</p>
    <p class="text-xs text-slate-400">stock : ${product.stock}</p>
  `;

  const isSoldOut = product.availability === "sold-out";
  const addBtn = document.createElement("button");
  addBtn.textContent = "Add to Cart";
  addBtn.disabled = isSoldOut;
  addBtn.className = isSoldOut
    ? "mt-2 bg-slate-200 text-slate-400 text-sm font-medium py-2 rounded-md cursor-not-allowed"
    : "mt-2 bg-brand text-white text-sm font-medium py-2 rounded-md hover:bg-slate-800 transition";
  addBtn.addEventListener("click", () => addToCart(product));

  card.appendChild(addBtn);
  return card;
}

// ===== 6. Rendering typed data =====
const grid = document.getElementById("product-grid") as HTMLDivElement;

function renderProducts(list: Product[]): void {
  grid.innerHTML = "";
  list.forEach((product) => grid.appendChild(createProductCard(product)));
}

function renderCartSummary(): void {
  const { items, total } = getCartTotals();
  (document.getElementById("cart-items") as HTMLSpanElement).textContent = `${items} items`;
  (document.getElementById("cart-total") as HTMLSpanElement).textContent = formatRupiah(total);
}

// ===== 7. Live search =====
const searchInput = document.getElementById("search") as HTMLInputElement;
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  renderProducts(products.filter((p) => p.name.toLowerCase().includes(query)));
});

// ===== Init =====
renderProducts(products);
renderCartSummary();