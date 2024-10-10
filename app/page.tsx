import AdvantageSection from "@/components/advantages/Advantages";
import FAQAccordion from "@/components/faq/Faq";
import Hero from "@/components/hero/Hero";
import PosCard from "@/components/pos card/PosCard";
import SoftPOSSection from "@/components/soft pos/SoftPos";
import { Star, Tag } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blord",
  description: "Simplify Your Business With Our POS Solutions. Make Bill Payments Effortless With Our Cutting-Edge POS Systems.",
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
    <Hero/>
    <div className="py-12 px-4 md:px-20 bg-gray-50">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-10">
        Diverse POS Tailored To Your Needs
      </h2>

      {/* POS Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kernel POS Card */}
        <PosCard
        imageStyle={'bg-[#FFCDB2]'}
          title="Kernel POS"
          description="Affordable, Compact, And Durable - Delivering High Value For Money."
          imageSrc="/kennelpos.svg" // Replace with actual image path
          imageAlt="Kernel POS"
          features={[
            {
              icon: <Star />,
              title: "Fast Transactions",
              description:
                "Experience Lightning-Fast Transactions With Bill Point POS Machines, Ensuring Quick Checkouts And Enhanced Customer Satisfaction.",
            },
          ]}
        />

        {/* Android POS Card */}
        <PosCard
        imageStyle={'bg-[#F2FBF0]'}
          title="Android POS"
          description="Smooth Operation, Versatile Features Like Savings - Designed To Fulfill Your Needs Efficiently."
          imageSrc="/andriodpos.svg" // Replace with actual image path
          imageAlt="Android POS"
          features={[
            {
              icon: <Tag />,
              title: "Affordable Rates",
              description:
                "Speed Up Your Payment Process With Bill Point's POS Machines, Designed For Quick And Seamless Transactions.",
            },
          ]}
        />
      </div>
    </div>

    <AdvantageSection/>
    <SoftPOSSection/>
    <FAQAccordion/>

    </div>
  );
}
