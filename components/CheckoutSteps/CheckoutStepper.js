import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Link from "../../src/Link";

function getSteps() {
  return [
    { label: "Sign In", link: "/signin" },
    { label: "Shipping", link: "/shipping" },
    { label: "Payment", link: "/payment" },
    { label: "Place Order", link: "/placeorder" },
  ];
}

function CheckoutStepper({ stepIndex }) {
  const steps = getSteps();

  return (
    <Stepper activeStep={stepIndex}>
      {steps.map((st, index) => (
        <Step key={st.label}>
          <StepLabel>
            {stepIndex >= index ? (
              <Link href={st.link}>{st.label} </Link>
            ) : (
              st.label
            )}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default CheckoutStepper;
