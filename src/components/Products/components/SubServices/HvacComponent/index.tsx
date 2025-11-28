import React from "react";

import BreadCrumb from "../../BreadCrumb";
import ServiceHeroSection, {
  IServiceHeroSectionInterfaceProps,
} from "../Components/ServiceHeroSection";
// import ServiceTypeShowcase from "@/components/Common/ServiceTypeShowcase";
// import ProcessSteps from "@/components/Common/ProcessSteps";
// import BenefitsSection from "@/components/Common/BenefitsSection";
// import ProjectGallery from "@/components/Common/ProjectGallery";
import FAQSComp from "../Components/FAQSComp";



const HvacComponent = () => {
    const hvacHeroData = {
  heading: "Expert HVAC Services",
  subHeading: "Heating • Cooling • Ventilation Solutions",
  bgImageUrl: "/images/custombuilder/subservices/plumbing/herosection.png",

  bookingCtaUrl: { label: "Book HVAC Service", url: "" },

  locationcta: [
    { label: "New York", url: "" },
    { label: "California", url: "" },
    { label: "Texas", url: "" },
  ],

  selectedId: { id: 7, service: "HVAC" },

  description:
    "Professional HVAC installation, repair, and maintenance services designed to deliver energy-efficient heating, cooling, and ventilation for homes and commercial spaces.",
};
 const hvacFaqs = [
  {
    question: "How often should I service my HVAC system?",
    answer:
      "It is recommended to service your HVAC system at least once a year. For best performance, schedule maintenance twice a year—before summer and before winter.",
  },
  {
    question: "What are the signs that my HVAC system needs repair?",
    answer:
      "Common signs include unusual noises, weak airflow, uneven temperatures, foul smells, higher electricity bills, and the system taking longer to heat or cool.",
  },
  {
    question: "How long does an HVAC installation usually take?",
    answer:
      "A standard HVAC installation typically takes 4–8 hours. Larger or more complex systems may take up to 1–2 days depending on ductwork requirements.",
  },
  {
    question: "How can I reduce my HVAC energy bills?",
    answer:
      "Use a programmable thermostat, clean or replace filters regularly, schedule routine maintenance, ensure proper insulation, and upgrade to energy-efficient units.",
  },
  {
    question: "Should I repair or replace my old HVAC system?",
    answer:
      "If your system is over 10–12 years old, requires frequent repairs, or has poor efficiency, replacing it is often more cost-effective and energy-efficient.",
  },
];


  return (
    <section className="w-full px-5 ">
      <BreadCrumb
        steps={[
          { label: "Our Services", link: "" },
          { label: "HVAC", link: "/services/hvac" },
        ]}
        currentStep="HVAC"
      />

      <ServiceHeroSection {...hvacHeroData} />

      {/* <ServiceTypeShowcase types={hvacTypesData} />

      <ProcessSteps steps={hvacProcessSteps} />

      <BenefitsSection features={hvacBenefits} />

      <ProjectGallery projects={hvacProjects} /> */}

      <FAQSComp faqs={hvacFaqs} image="/images/services/flooring.png"  />

      
    </section>
  );
};

export default HvacComponent;
