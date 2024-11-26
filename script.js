const apiUrl = "http://localhost:3000"; // Replace with your backend URL

// Fetch and display products
async function fetchProducts() {
    const response = await fetch(`${apiUrl}/products`);
    const products = await response.json();

    const productDropdown = document.getElementById("product");
    const productList = document.getElementById("products");

    products.forEach((product) => {
        // Populate dropdown
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = `${product.name} - Stock: ${product.stock}`;
        productDropdown.appendChild(option);

        // Populate list
        const listItem = document.createElement("li");
        listItem.textContent = `${product.name} - Price: $${product.price}`;
        productList.appendChild(listItem);
    });
}

// Submit order
document.getElementById("order").addEventListener("submit", async (event) => {
    event.preventDefault();

    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;

    const response = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, quantity }),
    });

    if (response.ok) {
        alert("Order placed successfully!");
    } else {
        alert("Failed to place order.");
    }
});

// Load products on page load
fetchProducts();
