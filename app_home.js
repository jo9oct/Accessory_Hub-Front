
// const navItems = [
//   document.getElementById("Home"),
//   document.getElementById("Shop"),
//   document.getElementById("Catagory"),
//   document.getElementById("About"),
//   document.getElementById("Contact")
// ];

// navItems.forEach(item => {
//   item.addEventListener("click", () => {
//       navItems.forEach(nav => nav.style.color = "black"); 
//       item.style.color = "green"; 
//   });
// });

const categories = [
  { buttons: document.querySelectorAll(".click1"), target: "watch" },
  { buttons: document.querySelectorAll(".click2"), target: "headset" },
  { buttons: document.querySelectorAll(".click3"), target: "mobile" },
  { buttons: document.querySelectorAll(".click4"), target: "laptop" },
  { buttons: document.querySelectorAll(".click5"), target: "ps" },
  { buttons: document.querySelectorAll(".click6"), target: "tablet" },
];

const costItems = document.querySelectorAll(".cost1");

categories.forEach(({ buttons, target }) => {
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      costItems.forEach(item => {
        if (item.classList.contains("a")) {
          item.style.display = item.classList.contains(target) ? "block" : "none";
        }
      });
    });
  });
});


const icons = document.querySelector(".icon");
const lists = document.querySelector(".h2");

icons.onclick = () => {
  icons.classList.toggle("fa-x");
  lists.classList.toggle("reverse_head");
};

document.addEventListener('DOMContentLoaded', function () {
  const isHomePage = document.querySelector('.cost'); // Detect home page
  const isCartPage = document.getElementById('chart_table'); // Detect chart page

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let itemCounter = cartItems.length > 0 ? Math.max(...cartItems.map(item => item.number)) + 1 : 1;

  // ---------------- Home Page Logic ----------------
  if (isHomePage) {
      const products = document.querySelectorAll('.cost1');

      products.forEach(product => {
          product.addEventListener('click', function () {
              const name = product.querySelector('h3').textContent.trim();
              const priceText = product.querySelector('p:last-of-type').textContent.replace('$', '');
              const price = parseFloat(priceText);
              const image = product.querySelector('img').getAttribute('src');

              const existingItemIndex = cartItems.findIndex(item => item.name === name);

              if (existingItemIndex !== -1) {
                  cartItems[existingItemIndex].quantity += 1;
              } else {
                  cartItems.push({
                      id: Date.now(),
                      number: itemCounter++,
                      name,
                      price,
                      image,
                      quantity: 1
                  });
              }

              localStorage.setItem('cartItems', JSON.stringify(cartItems));
              alert(`${name} added to cart!`);
          });
      });
  }

  // ---------------- Chart Page Logic ----------------
  if (isCartPage) {
      const cartBody = document.getElementById('cart_body');
      const grandTotalCell = document.getElementById('grand_total');

      renderCart();

      function renderCart() {
          cartBody.innerHTML = '';
          let grandTotal = 0;

          cartItems.forEach((item, index) => {
              const subtotal = item.price * item.quantity;
              grandTotal += subtotal;

              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${item.number}</td>
                  <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                  <td>${item.name}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>
                      <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                      ${item.quantity}
                      <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                  </td>
                  <td>$${subtotal.toFixed(2)}</td>
                  <td><button class="remove-btn" onclick="removeItem(${index})">Remove</button></td>
              `;
              cartBody.appendChild(row);
          });

          grandTotalCell.textContent = `$${grandTotal.toFixed(2)}`;
      }

      window.changeQuantity = function (index, change) {
          const newQuantity = cartItems[index].quantity + change;

          if (newQuantity > 0) {
              cartItems[index].quantity = newQuantity;
          } else {
              cartItems.splice(index, 1);
          }

          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          renderCart();
      };

      window.removeItem = function (index) {
          cartItems.splice(index, 1);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          renderCart();
      };
  }
});

