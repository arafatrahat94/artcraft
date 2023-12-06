import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PaymentGate = ({ paymentId, setPaymentId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentLoading, setPamentLoading] = useState(null);
  const handleSubmit = async (event) => {
    setPamentLoading(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      if (paymentMethod.id) {
        setPaymentId(paymentMethod.id);
        setPamentLoading(false);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="
        rounded-2xl px-4
         border h-16 mt-3 pt-[22px] border-blue-300 theme-text"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {paymentId ? (
          <></>
        ) : (
          <button
            className={`btn border border-blue-600 font-Montserrat dark:bg-[#121212] theme-text rounded mt-5 px-10 ${
              paymentLoading === true ? "btn-disabled" : ""
            }`}
            type="submit"
            disabled={!stripe}
          >
            Pay Now
          </button>
        )}
      </form>
    </div>
  );
};

export default PaymentGate;
