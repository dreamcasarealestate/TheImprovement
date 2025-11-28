import withGeneralLayout from "@/components/Layouts/GeneralLayout";
import ConstructionForBusinessComponent from "@/components/Products/components/SubServices/ConstructionForBusinessComponent";
import React from "react";
import SEO from '@/components/SEO';


const Construction = () => {
  return (
    <div>
      <SEO
        title="Expert Commercial Construction Services | Office, Retail & Industrial Buildings | TheImprovement"
        description="TheImprovement specializes in top-quality commercial construction services, including office spaces, retail stores, industrial buildings, and business infrastructure development."
        keywords="Commercial Construction, Business Construction, Office Building Contractors, Retail Space Construction, Industrial Construction, Infrastructure Development, TheImprovement Commercial Services"
        imageUrl="https://www.TheImprovement.in/images/logobb.png"
      />

      <ConstructionForBusinessComponent />
    </div >
  );
};

export default withGeneralLayout(Construction);
