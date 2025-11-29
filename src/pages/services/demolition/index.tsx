import React from "react";
import withGeneralLayout from "@/components/Layouts/GeneralLayout";
import ConstructionForBusinessComponent from "@/components/Products/components/SubServices/ConstructionForBusinessComponent";
import SEO from "@/components/SEO";
import DemolitionComponent from "@/components/Products/components/SubServices/DemolitionComponent";

const Demolition = () => {
  return (
    <div>
      <SEO
        title="Expert Demolition Services | Safe & Efficient Building Demolition | TheImprovement"
        description="TheImprovement provides professional demolition services for commercial and residential buildings, ensuring safe, efficient, and environmentally responsible demolition solutions."
        keywords="Demolition Services, Building Demolition, Commercial Demolition, Residential Demolition, Safe Demolition, TheImprovement"
        imageUrl="https://www.TheImprovement.in/images/logobb.png"
      />

      <DemolitionComponent />
    </div>
  );
};

export default withGeneralLayout(Demolition);
