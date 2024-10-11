'use client'
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const navigateToApplyPos = () => router.push('/apply-for-pos');

  return (
    <section ref={ref} className="bg-black pt-32 text-white h-[90dvh] md:h-full py-20 px-4 md:px-20 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ scale, opacity }}
      >
        {/* Title */}
        <h1 className="text-3xl md:text-5xl mx:0 md:mx-44 leading-10 font-bold mb-4">
          Simplify Your Business With Our POS Solutions.
        </h1>
        {/* Subtitle */}
        <p className="text-lg md:text-xl mb-8">
          Make Bill Payments Effortless With Our Cutting-Edge POS Systems.
        </p>
        {/* Button */}
        <Button 
          onClick={navigateToApplyPos} 
          className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-6 py-3 rounded-md mb-8"
        >
          Apply Now
        </Button>
        {/* Image Section */}
        <div className="relative w-full p-5 md:w-3/4 lg:w-1/2 mx-auto">
        
          <Image
            src="/hero.svg" // replace with the actual image path
            alt="Woman using phone"
            width={900}
            height={900}
            className="relative z-10"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;