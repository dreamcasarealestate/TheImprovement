import React from "react";
import withGeneralLayout from "@/components/Layouts/GeneralLayout";

import SEO from "@/components/SEO";

import FlooringComponent from "@/components/Products/components/SubServices/FlooringComponent";
import HvacComponent from "@/components/Products/components/SubServices/HvacComponent";

const Hvac = () => {
  return (
    <div>
       <SEO
        title="Expert HVAC Services | Heating, Cooling & Ventilation Solutions | TheImprovement"
        description="TheImprovement provides top-quality HVAC services, including air conditioning installation, heating system repair, ventilation setup, duct cleaning, and complete climate control solutions for homes and businesses."
        keywords="HVAC Services, Air Conditioning Repair, Heating Installation, Ventilation Services, AC Maintenance, HVAC Contractors, Climate Control, TheImprovement"
        imageUrl="https://www.theimprovement.in/images/logobb.png"
      />

      <HvacComponent />
    </div>
  );
};

export default withGeneralLayout(Hvac);
