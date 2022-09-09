import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useChec } from "../contexts/ChecContext";
import Review from "./Review";

const StripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function PaymentForm({ shippingData, backStep, nextStep }) {
  const { checkoutToken, handleCaptureCheckout } = useChec();

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstname,
          lastname: shippingData.lastname,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gatway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      handleCaptureCheckout(checkoutToken?.id, orderData);
      nextStep();
    }
  };
  const Shiping_cost = shippingData.shippingOption.price.raw;
  const subtotal_cost = checkoutToken.subtotal.raw;

  return (
    <>
      <Review shippingData={shippingData} />
      <div className="row">
        <h4>Payment Methord</h4>
        <Elements stripe={StripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form
                action=""
                onSubmit={(e) => handleSubmit(e, elements, stripe)}
              >
                <CardElement />
                <div
                  className="button__group"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "2rem 0",
                  }}
                >
                  <button onClick={{ backStep }} className="btn btn-success">
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!stripe}
                    className="btn btn-success"
                  >
                    Pay ${Shiping_cost + subtotal_cost}
                  </button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    </>
  );
}
