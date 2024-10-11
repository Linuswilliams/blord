'use client'

import { Bell } from 'lucide-react';
import Image from 'next/image';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const AdvantageSection = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
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
      variants={containerVariants}
      className="bg-white py-12"
    >
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* Text Section */}
        <motion.div variants={itemVariants}>
          <motion.p variants={itemVariants} className="text-orange-500 uppercase font-bold tracking-wide text-sm mb-2">
            Advantages
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Bill Point POS Machine?
          </motion.h2>
          <motion.h3 variants={itemVariants} className="text-xl flex items-center text-black font-semibold mb-4">
            <div className='bg-red-400 mr-4 p-2 rounded-full'>
              <Bell color='white'/>
            </div>
            Bill Point Notifications
          </motion.h3>
          <motion.p variants={itemVariants} className="text-gray-600">
            Choosing Bill Point POS Machines means investing in efficiency and reliability. 
            Our systems deliver lightning-fast transactions, ensuring minimal wait times and 
            increased customer satisfaction. With an easy setup process and affordable rates, 
            you can quickly integrate our solutions into your business.
          </motion.p>
        </motion.div>
        
        {/* Image Section */}
        <motion.div variants={itemVariants} className="relative">
          <Image 
            src="/woman.jpg" // Replace with the actual image path
            alt="Person with POS machine"
            width={2000}
            height={2000}
            className="rounded-lg object-cover w-full"
          />
          {/* Decorative Background Circle */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-transparent rounded-full -z-10" /> */}
        </motion.div>
        
      </div>
    </motion.div>
  );
};

export default AdvantageSection;