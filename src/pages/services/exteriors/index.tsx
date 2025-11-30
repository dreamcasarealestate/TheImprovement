import React from "react";
import withGeneralLayout from "@/components/Layouts/GeneralLayout";

import SEO from "@/components/SEO";

import FlooringComponent from "@/components/Products/components/SubServices/FlooringComponent";
import ExteriorsComponent from "@/components/Products/components/SubServices/ExteriorsComponent";

const Exteriors = () => {
  return (
    <div>
      

      <ExteriorsComponent />
    </div>
  );
};

export default withGeneralLayout(Exteriors);
