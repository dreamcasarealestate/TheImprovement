import React from "react";
import BreadCrumb from "../../BreadCrumb";
import ServiceHeroSection from "../Components/ServiceHeroSection";
import OutdoorSpacesShowcase, { OutdoorSpace } from "./OutDoorspace";
import MaterialComparison, { Material } from "./MaterialComparison";
import ProjectTimeline from "./ProjectTimeline";
import MaintenanceTips from "./MaintenanceTips";
import FAQSComp from "../Components/FAQSComp";

export default function ExteriorsComponent() {
  const exteriorsHeroData = {
    heading: "Driveway & Exterior Works",
    subHeading:
      "Professional driveway, patio, fencing, and landscaping services to enhance your property's functionality and curb appeal.",
    bgImageUrl: "/images/earthmoves/herosection/herosectionimage.png",
    bookingCtaUrl: { label: "Book Exterior Service", url: "" },
    locationcta: [
      { label: "New York", url: "" },
      { label: "California", url: "" },
      { label: "Texas", url: "" },
    ],
    selectedId: { id: 9, service: "Exteriors" },
    description:
      "Professional driveway, patio, fencing, and landscaping services to enhance your property's functionality and curb appeal.",
  };

  const outdoorSpacesData: OutdoorSpace[] = [
    {
      title: "Driveways",
      description: "Durable vehicle access solutions",
      image: "/images/exteriors/driveway.jpg",
      features: ["Concrete", "Asphalt", "Pavers", "Gravel"],
      href: "/services/exteriors/driveways",
    },
    {
      title: "Patios & Decks",
      description: "Outdoor living and entertainment areas",
      image: "/images/exteriors/patio.jpg",
      features: ["Stone Patios", "Wooden Decks", "Composite Decking"],
      href: "/services/exteriors/patios",
    },
    {
      title: "Pathways & Walkways",
      description: "Beautiful pedestrian routes",
      image: "/images/exteriors/pathway.jpg",
      features: ["Paved Paths", "Garden Walkways", "Stepping Stones"],
      href: "/services/exteriors/pathways",
    },
    {
      title: "Retaining Walls",
      description: "Structural landscaping solutions",
      image: "/images/exteriors/retaining-wall.jpg",
      features: ["Block Walls", "Stone Walls", "Terracing"],
      href: "/services/exteriors/retaining-walls",
    },
  ];
  const materialsData: Material[] = [
    {
      name: "Concrete",
      image: "/images/materials/concrete.jpg",
      lifespan: "30-40 years",
      maintenance: "Low",
      costLevel: "$$",
      pros: ["Highly durable", "Versatile designs", "Low maintenance"],
      cons: ["Can crack over time", "Requires sealing"],
      bestFor: ["Driveways", "Patios", "Large areas"],
    },
    {
      name: "Pavers",
      image: "/images/materials/pavers.jpg",
      lifespan: "25-50 years",
      maintenance: "Medium",
      costLevel: "$$$",
      pros: ["Easy repairs", "Beautiful aesthetics", "Permeable options"],
      cons: ["Higher cost", "Weed growth in joints"],
      bestFor: ["Driveways", "Walkways", "Pool decks"],
    },
    {
      name: "Asphalt",
      image: "/images/materials/asphalt.jpg",
      lifespan: "15-20 years",
      maintenance: "Medium",
      costLevel: "$",
      pros: ["Cost-effective", "Quick installation", "Smooth surface"],
      cons: ["Shorter lifespan", "Requires resealing"],
      bestFor: ["Driveways", "Parking lots"],
    },
    {
      name: "Natural Stone",
      image: "/images/materials/stone.jpg",
      lifespan: "50+ years",
      maintenance: "Low",
      costLevel: "$$$",
      pros: ["Premium look", "Extremely durable", "Unique patterns"],
      cons: ["Expensive", "Heavy installation"],
      bestFor: ["Patios", "Walkways", "Retaining walls"],
    },
  ];
  const faqs = [
  {
    question: "What types of driveway and exterior works do you offer?",
    answer:
      "We provide complete driveway installation, resurfacing, exterior paving, walkway construction, boundary wall finishing, landscaping edges, and exterior surface enhancement services.",
  },
  {
    question: "Which materials do you use for driveway construction?",
    answer:
      "We offer multiple materials including concrete, pavers, stamped concrete, natural stone, interlocking blocks, and asphalt depending on your design, durability requirements, and budget.",
  },
  {
    question: "How long does a typical driveway installation take?",
    answer:
      "Most driveway projects take 3–7 days depending on size, material, weather conditions, curing time, and site preparation requirements.",
  },
  {
    question: "Do you provide maintenance support after the installation?",
    answer:
      "Yes, we offer maintenance guidance, periodic inspection, crack repairs, sealing, pressure washing, and seasonal care to keep your driveway and exterior surfaces in excellent condition.",
  },
  {
    question: "Can you customize driveway designs and patterns?",
    answer:
      "Absolutely. We offer custom layouts, color options, textures, edging styles, and decorative patterns to match the aesthetics of your home exterior.",
  },
  
  
];

  return (
    <div className="w-full md:px-5 px-2">
      <BreadCrumb
        steps={[
          { label: "Our Services", link: "/services" },
          { label: "Driveway & Exterior Works", link: "/services/exteriors" },
        ]}
        currentStep="Driveway & Exterior Works"
      />
      <div className=" mb-[45px] md:mb-[64px]">
        <ServiceHeroSection {...exteriorsHeroData} />
      </div>
      <div className=" mb-[45px] md:mb-[64px]">
        <OutdoorSpacesShowcase spaces={outdoorSpacesData} />
      </div>
      <div className=" mb-[45px] md:mb-[64px]">
        <MaterialComparison materials={materialsData} />
      </div>
      <div className=" mb-[45px] md:mb-[64px]">
        <ProjectTimeline />
      </div>
      <div className=" mb-[45px] md:mb-[64px]">
        <MaintenanceTips />
      </div>
       <FAQSComp
        image="/images/earthmoves/packagesandservices/loaderrental.png"
        faqs={faqs}
      />

    </div>
  );
}
