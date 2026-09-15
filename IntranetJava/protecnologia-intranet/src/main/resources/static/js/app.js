const express = require("express");
const path = require("path");

const app = express();

// 🔥 Servir frontend
app.use(express.static(path.join(__dirname, "frontend")));

// (Tu API sigue funcionando)
app.use(express.json());

// Ejemplo si tienes rutas:
app.use("/api", require("./routes"));

// 🔥 Puerto
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});