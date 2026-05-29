import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import Stripe from "stripe";

// Load .env
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

// Debug
console.log("Loading env from:", envPath);
console.log("STRIPE KEY =", process.env.STRIPE_SECRET_KEY);

// Express app
const app = express();
app.use(cors());
app.use(express.json());

// Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173",
      cancel_url: "http://localhost:5173",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => {
  console.log("Stripe server running on http://localhost:4242");
});