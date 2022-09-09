import React, { useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";

import { AddressForm, Confirmation, PaymentForm } from "../components/index";
import { useChec } from "../contexts/ChecContext";

const steps = ["Shiping Address", "Payment Details"];

export default function Checkout() {
  const { cart, checkoutToken, generateCheckoutToken } = useChec();

  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    generateCheckoutToken(cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  function From() {
    return (
      <>
        {activeStep === 0 ? (
          <AddressForm next={next} />
        ) : (
          <PaymentForm
            shippingData={shippingData}
            backStep={backStep}
            nextStep={nextStep}
          />
        )}
      </>
    );
  }

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <h4 className="">Checkout</h4>

      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step label={step} />
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <Confirmation />
      ) : checkoutToken ? (
        <From />
      ) : (
        <h4>loading...</h4>
      )}
    </div>
  );
}
