import express from "express";
import cors from "cors";
import Stripe from "stripe";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Stripe SECRET KEY (NOT publishable key)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE CHECKOUT SESSION
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: "price_1TcODHDsXgTcZ1JbAJtLUpSB",
        quantity: 1
      }
    ],
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173"
  });

  res.json({ url: session.url });
});

app.listen(4242, () => {
  console.log("Server running on http://localhost:4242");
});