import express from "express";
import authRoutes from "./routes/auth.routes.js";
import auppRoutes from "./routes/app.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { connectDb } from "./db.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDb();

const app = express();

// configuración de puerto
app.set("port", 3000);

// Configuración EJS como motor de plantilla
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.set("views", "./src/views");

// Configuración de archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

// Middleware para analizar y recibir datos desde formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para analizar JSON
app.use(express.json());

// Middleware para analizar cookies
app.use(cookieParser());

// Uso de las rutas especificadas en el directorio /routes/auth.routes.js
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use(auppRoutes);

// Middleware para error 404
app.use((req, res) => {
  const usuario = "";
  res.status(404).render("error_404", {
    title: "Error",
    usuario,
  });
});

app.listen(app.get("port"));
console.log(`Server runing on port ${app.get("port")} `);
