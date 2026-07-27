import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql, ensureTable } from "../src/utils/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    await ensureTable();
    const { name, email, phone, course, message } = req.body as Record<string, string>;

    if (!name || !email) return res.status(400).json({ error: "Name and email are required." });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email address." });

    const result = await sql`
      INSERT INTO contacts (name, email, phone, course, message)
      VALUES (${name}, ${email}, ${phone || ""}, ${course || ""}, ${message || ""})
      RETURNING *
    `;

    console.log(`[Contact] Saved: ${name} (${email})`);
    return res.status(200).json({ success: true, contact: result[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
