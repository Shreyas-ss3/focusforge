import { loadStripe } from "@stripe/stripe-js";

// 💳 Stripe publishable key (NOT secret key)
export const stripePromise = loadStripe(
  "pk_test_51TcNaMDsXgTcZ1Jba90N19EMlyUxTKzVdNR8KzwkcuPegizvN05O0iomC5BzX97FAk0rVPwQRAs7vh8llJ4dywSR00JCaVtyAz"
);