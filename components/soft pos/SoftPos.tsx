'use client'

import Image from 'next/image'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

export default function Component() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="m-6 flex items-center justify-center relative">
      <motion.div 
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={containerVariants}
        className="container bg-black mx-auto -py-10 md:px-12 max-w-[1000px] rounded-2xl flex flex-col md:flex-row items-center text-white"
      >
        {/* Text Section */}
        <motion.div variants={itemVariants} className="md:w-1/2">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
            Move your business forward with <span className="text-purple-400">softPOS</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg mb-4">
            Business can find you anywhere. softPOS from Bill point helps you receive payments 
            on the move with any smartphone connected to the internet.
          </motion.p>
        </motion.div>
        
        {/* Image Section */}
        <motion.div variants={itemVariants} className="md:w-1/2 flex justify-end relative w-[100px] h-[300px]">
          <Image 
            src="/b.png"
            alt="Bill Point POS Machine"
           
            className=""
            fill
          />
        </motion.div>
        
        {/* Background Stars */}
        <motion.div 
          variants={itemVariants}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.5,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}