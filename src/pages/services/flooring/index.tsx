import React from "react";
import withGeneralLayout from "@/components/Layouts/GeneralLayout";

import SEO from "@/components/SEO";

import FlooringComponent from "@/components/Products/components/SubServices/FlooringComponent";

const Flooring = () => {
  return (
    <div>
      <SEO
        title="Expert Flooring Services | Professional Flooring Solutions | TheImprovement"
        description="TheImprovement provides top-quality flooring services for residential and commercial spaces, including installation, repair, and maintenance of all types of flooring materials."
        keywords="Flooring Services, Professional Flooring, Residential Flooring, Commercial Flooring, Flooring Installation, Flooring Repair, TheImprovement"
        imageUrl="https://www.TheImprovement.in/images/logobb.png"
      />

      <FlooringComponent />
    </div>
  );
};

export default withGeneralLayout(Flooring);
