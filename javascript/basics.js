// ---------- Variables & data types ----------
// let: value can change later. const: value is locked after assignment.
let itemName = "Panel Enclosure MCB 12-Way"; 
const unitPrice = 850000;         
let quantity = 3;                 
const inStock = true;          
let discountCode = null;                        
let shippingCost;                                

// object: a collection of related key/value pairs
const order = { itemName, unitPrice, quantity, inStock };

// array: an ordered list of values
const availableDiscountCodes = ["WELCOME10", "BULK5", "NONE"];

// ---------- Operators ----------
const subtotal = unitPrice * quantity;             
const qualifiesForBulkDiscount = quantity >= 3;     
const canCheckout = inStock && quantity > 0;       
const discountLabel = qualifiesForBulkDiscount
  ? "Bulk discount applied"
  : "No discount";                            

// ---------- Functions ----------
// Function declaration
function calculateDiscount(amount, qualifies) {
  const discountRate = qualifies ? 0.05 : 0;
  return amount * discountRate;
}

// Arrow function with a default parameter
const calculateTotal = (amount, discount = 0, taxRate = 0.11) => {
  const afterDiscount = amount - discount;
  return afterDiscount + afterDiscount * taxRate;
};

const discount = calculateDiscount(subtotal, qualifiesForBulkDiscount);
const total = calculateTotal(subtotal, discount);

// ---------- Output ----------
document.getElementById("output").innerHTML = `
  <ul>
    <li>Item: ${order.itemName}</li>
    <li>Quantity: ${order.quantity}</li>
    <li>Subtotal: Rp ${subtotal.toLocaleString("id-ID")}</li>
    <li>${discountLabel}: Rp ${discount.toLocaleString("id-ID")}</li>
    <li>Total (incl. 11% tax): Rp ${Math.round(total).toLocaleString("id-ID")}</li>
    <li>Can checkout: ${canCheckout}</li>
  </ul>
`;

console.log("Order object:", order);
console.log("Subtotal:", subtotal, "Discount:", discount, "Total:", total);
console.log("Available discount codes:", availableDiscountCodes);