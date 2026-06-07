import express from "express";
import { createServer as createViteServer } from "vite";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoClient, Db, ObjectId } from "mongodb";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = "web_hub";

let db: Db;

async function connectDb() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DB_NAME);
  console.log("Connected to MongoDB:", DB_NAME);
}

function toId(value: any): any {
  return typeof value === "string" && /^[a-f\d]{24}$/i.test(value) ? new ObjectId(value) : value;
}

async function ensureAdmin() {
  const adminExists = await db.collection("users").findOne({ username: "admin" });
  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync("admin123", 10);
    await db.collection("users").insertOne({ username: "admin", password: hashedPassword });
  }
}

async function ensureSettings() {
  const existing = await db.collection("settings").find({}).toArray();
  if (existing.length === 0) {
    await db.collection("settings").insertMany([
      { key: "whatsapp_number", value: "254103591401" },
      { key: "company_email", value: "webhubsolutionhs@gmail.com" }
    ]);
  } else {
    await db.collection("settings").updateOne({ key: "whatsapp_number" }, { $set: { value: "254103591401" } });
    await db.collection("settings").updateOne({ key: "company_email" }, { $set: { value: "webhubsolutionhs@gmail.com" } });
  }
}

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "nexus-super-secret-key";

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

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.collection("users").findOne({ username });

  if (user && bcrypt.compareSync(password, user.password as string)) {
    const token = jwt.sign({ id: (user._id as ObjectId).toString(), username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/api/projects", async (req, res) => {
  const projects = await db.collection("projects").find({}).sort({ createdAt: -1 }).toArray();
  res.json(projects.map(p => ({ ...p, id: (p._id as ObjectId).toString() })));
});

app.post("/api/projects", authenticateToken, async (req, res) => {
  const { name, description, technologies, imageUrl, link } = req.body;
  const result = await db.collection("projects").insertOne({ name, description, technologies, imageUrl, link, createdAt: new Date().toISOString() });
  res.json({ id: result.insertedId.toString() });
});

app.put("/api/projects/:id", authenticateToken, async (req, res) => {
  const { name, description, technologies, imageUrl, link } = req.body;
  await db.collection("projects").updateOne({ _id: toId(req.params.id) }, { $set: { name, description, technologies, imageUrl, link } });
  res.json({ success: true });
});

app.delete("/api/projects/:id", authenticateToken, async (req, res) => {
  await db.collection("projects").deleteOne({ _id: toId(req.params.id) });
  res.json({ success: true });
});

app.get("/api/services", async (req, res) => {
  const services = await db.collection("services").find({}).toArray();
  res.json(services.map(s => ({ ...s, id: (s._id as ObjectId).toString() })));
});

app.post("/api/services", authenticateToken, async (req, res) => {
  const { name, description, icon } = req.body;
  const result = await db.collection("services").insertOne({ name, description, icon });
  res.json({ id: result.insertedId.toString() });
});

app.put("/api/services/:id", authenticateToken, async (req, res) => {
  const { name, description, icon } = req.body;
  await db.collection("services").updateOne({ _id: toId(req.params.id) }, { $set: { name, description, icon } });
  res.json({ success: true });
});

app.delete("/api/services/:id", authenticateToken, async (req, res) => {
  await db.collection("services").deleteOne({ _id: toId(req.params.id) });
  res.json({ success: true });
});

app.get("/api/messages", authenticateToken, async (req, res) => {
  const messages = await db.collection("messages").find({}).sort({ createdAt: -1 }).toArray();
  res.json(messages.map(m => ({ ...m, id: (m._id as ObjectId).toString() })));
});

app.post("/api/messages", async (req, res) => {
  const { fullName, email, phone, service, message } = req.body;
  const result = await db.collection("messages").insertOne({ fullName, email, phone, service, message, status: "unread", createdAt: new Date().toISOString() });
  res.json({ id: result.insertedId.toString() });
});

app.put("/api/messages/:id/status", authenticateToken, async (req, res) => {
  const { status } = req.body;
  await db.collection("messages").updateOne({ _id: toId(req.params.id) }, { $set: { status } });
  res.json({ success: true });
});

app.delete("/api/messages/:id", authenticateToken, async (req, res) => {
  await db.collection("messages").deleteOne({ _id: toId(req.params.id) });
  res.json({ success: true });
});

app.get("/api/settings", async (req, res) => {
  const settings = await db.collection("settings").find({}).toArray();
  const settingsObj = settings.reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});
  res.json(settingsObj);
});

app.put("/api/settings", authenticateToken, async (req, res) => {
  const { whatsapp_number, company_email } = req.body;
  if (whatsapp_number) await db.collection("settings").updateOne({ key: "whatsapp_number" }, { $set: { value: whatsapp_number } });
  if (company_email) await db.collection("settings").updateOne({ key: "company_email" }, { $set: { value: company_email } });
  res.json({ success: true });
});

app.get("/api/stats", authenticateToken, async (req, res) => {
  const messagesCount = await db.collection("messages").countDocuments();
  const projectsCount = await db.collection("projects").countDocuments();
  const servicesCount = await db.collection("services").countDocuments();
  const unreadMessages = await db.collection("messages").countDocuments({ status: "unread" });

  res.json({
    messages: messagesCount,
    projects: projectsCount,
    services: servicesCount,
    unread: unreadMessages
  });
});

async function startServer() {
  await connectDb();
  await ensureAdmin();
  await ensureSettings();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist/client")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/client", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
