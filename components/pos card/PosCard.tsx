'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PosCard = ({ title, description, features, imageSrc, imageAlt, imageStyle }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={cardVariants}
      className="bg-white rounded-lg shadow-lg max-w-[500px] p-6 text-center flex flex-col"
    >
      <motion.div 
        className={cn("w-full h-[350px] mb-4", imageStyle)}
        variants={itemVariants}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={300}
          height={300}
          className="mx-auto rounded-lg"
        />
      </motion.div>
      <motion.h3 variants={itemVariants} className="text-lg text-left font-bold mb-2">{title}</motion.h3>
      <motion.p variants={itemVariants} className="text-gray-600 mb-6 text-left">{description}</motion.p>
      {features.map((feature, index) => (
        <motion.div key={index} variants={itemVariants} className="md:flex hidden items-start mb-4">
          <div className="text-orange-500 text-2xl mr-4">
            {feature.icon}
          </div>
          <div className="text-left">
            <h4 className="font-bold text-sm">{feature.title}</h4>
            <p className="text-gray-600 text-xs">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PosCard;