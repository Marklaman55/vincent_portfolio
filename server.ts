import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    technologies TEXT,
    imageUrl TEXT,
    link TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    email TEXT,
    phone TEXT,
    service TEXT,
    message TEXT,
    status TEXT DEFAULT 'unread',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed Admin if not exists
const adminExists = db.prepare("SELECT * FROM users WHERE username = ?").get("admin");
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync("admin123", 10);
  db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run("admin", hashedPassword);
}

// Seed default settings
const settingsCount = db.prepare("SELECT COUNT(*) as count FROM settings").get() as { count: number };
if (settingsCount.count === 0) {
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run("whatsapp_number", "254103591401");
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run("company_email", "webhubsolutionhs@gmail.com");
} else {
  // Ensure settings are updated to the requested values
  db.prepare("UPDATE settings SET value = ? WHERE key = 'whatsapp_number'").run("254103591401");
  db.prepare("UPDATE settings SET value = ? WHERE key = 'company_email'").run("webhubsolutionhs@gmail.com");
}

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "nexus-super-secret-key";

// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API ROUTES ---

// Auth
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username) as any;

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Projects
app.get("/api/projects", (req, res) => {
  const projects = db.prepare("SELECT * FROM projects ORDER BY createdAt DESC").all();
  res.json(projects);
});

app.post("/api/projects", authenticateToken, (req, res) => {
  const { name, description, technologies, imageUrl, link } = req.body;
  const result = db.prepare("INSERT INTO projects (name, description, technologies, imageUrl, link) VALUES (?, ?, ?, ?, ?)").run(name, description, technologies, imageUrl, link);
  res.json({ id: result.lastInsertRowid });
});

app.put("/api/projects/:id", authenticateToken, (req, res) => {
  const { name, description, technologies, imageUrl, link } = req.body;
  db.prepare("UPDATE projects SET name = ?, description = ?, technologies = ?, imageUrl = ?, link = ? WHERE id = ?").run(name, description, technologies, imageUrl, link, req.params.id);
  res.json({ success: true });
});

app.delete("/api/projects/:id", authenticateToken, (req, res) => {
  db.prepare("DELETE FROM projects WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

// Services
app.get("/api/services", (req, res) => {
  const services = db.prepare("SELECT * FROM services").all();
  res.json(services);
});

app.post("/api/services", authenticateToken, (req, res) => {
  const { name, description, icon } = req.body;
  const result = db.prepare("INSERT INTO services (name, description, icon) VALUES (?, ?, ?)").run(name, description, icon);
  res.json({ id: result.lastInsertRowid });
});

app.put("/api/services/:id", authenticateToken, (req, res) => {
  const { name, description, icon } = req.body;
  db.prepare("UPDATE services SET name = ?, description = ?, icon = ? WHERE id = ?").run(name, description, icon, req.params.id);
  res.json({ success: true });
});

app.delete("/api/services/:id", authenticateToken, (req, res) => {
  db.prepare("DELETE FROM services WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

// Messages
app.get("/api/messages", authenticateToken, (req, res) => {
  const messages = db.prepare("SELECT * FROM messages ORDER BY createdAt DESC").all();
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const { fullName, email, phone, service, message } = req.body;
  const result = db.prepare("INSERT INTO messages (fullName, email, phone, service, message) VALUES (?, ?, ?, ?, ?)").run(fullName, email, phone, service, message);
  res.json({ id: result.lastInsertRowid });
});

app.put("/api/messages/:id/status", authenticateToken, (req, res) => {
  const { status } = req.body;
  db.prepare("UPDATE messages SET status = ? WHERE id = ?").run(status, req.params.id);
  res.json({ success: true });
});

app.delete("/api/messages/:id", authenticateToken, (req, res) => {
  db.prepare("DELETE FROM messages WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

// Settings
app.get("/api/settings", (req, res) => {
  const settings = db.prepare("SELECT * FROM settings").all();
  const settingsObj = (settings as any[]).reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});
  res.json(settingsObj);
});

app.put("/api/settings", authenticateToken, (req, res) => {
  const { whatsapp_number, company_email } = req.body;
  if (whatsapp_number) db.prepare("UPDATE settings SET value = ? WHERE key = 'whatsapp_number'").run(whatsapp_number);
  if (company_email) db.prepare("UPDATE settings SET value = ? WHERE key = 'company_email'").run(company_email);
  res.json({ success: true });
});

// Stats for Dashboard
app.get("/api/stats", authenticateToken, (req, res) => {
  const messagesCount = db.prepare("SELECT COUNT(*) as count FROM messages").get() as any;
  const projectsCount = db.prepare("SELECT COUNT(*) as count FROM projects").get() as any;
  const servicesCount = db.prepare("SELECT COUNT(*) as count FROM services").get() as any;
  const unreadMessages = db.prepare("SELECT COUNT(*) as count FROM messages WHERE status = 'unread'").get() as any;

  res.json({
    messages: messagesCount.count,
    projects: projectsCount.count,
    services: servicesCount.count,
    unread: unreadMessages.count
  });
});

// --- VITE MIDDLEWARE ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
