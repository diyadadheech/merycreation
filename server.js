const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

// Mock database
const db = JSON.parse(fs.readFileSync("database.json"));

// Get products
app.get("/products", (req, res) => {
    res.json(db.products);
});

// Place an order
app.post("/orders", (req, res) => {
    const { product, quantity } = req.body;
    const productToUpdate = db.products.find((p) => p.id === parseInt(product));

    if (!productToUpdate || productToUpdate.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
    }

    productToUpdate.stock -= quantity;
    db.orders.push({ product, quantity, date: new Date() });

    fs.writeFileSync("database.json", JSON.stringify(db, null, 2));
    res.status(200).json({ message: "Order placed successfully" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
