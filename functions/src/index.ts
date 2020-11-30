import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51HgXwkGAL7El0Bfu0pUbk7ttLdt6bsEoWWMRSEiGxWlBCEwlI8A8PWfFqdCX5NBDDupb6NEJdDTVOk0TAiCZ0kJE00WElzxAlC",
  { apiVersion: "2020-08-27" }
);

// App Config
const app = express();

//Middlewares
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

//Api Routes
app.get("/", (req: express.Request, response: express.Response) => {
  response.status(200).send("helllo world");
});

app.post("/payments/create", async (req: any, res: express.Response) => {
  const total: number = req.query.total;
  console.log("Payment request recieved >>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  res.status(201).json({
    clientSecret: paymentIntent.client_secret,
  });
});

//Listen
exports.api = functions.https.onRequest(app);
