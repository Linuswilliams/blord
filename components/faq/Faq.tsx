'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQAccordion() {
  const [openItem, setOpenItem] = useState(null)
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
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const handleToggle = (item) => {
    setOpenItem(openItem === item ? null : item)
  }

  const faqItems = [
    {
      value: 'item-1',
      question: 'What is a Bill Point POS machine?',
      answer: 'A Bill Point POS machine is a point-of-sale system that enables businesses to process transactions quickly and efficiently. It allows you to accept payments, manage sales, and track inventory all in one user-friendly device.',
    },
    {
      value: 'item-2',
      question: 'What are the costs associated with using a Bill Point POS machine?',
      answer: 'The costs associated with using a Bill Point POS machine vary depending on the features you need and your specific business requirements.',
    },
    {
      value: 'item-3',
      question: 'How much does a Bill Point POS machine cost?',
      answer: 'The price of a Bill Point POS machine depends on the model and customization options you choose.',
    },
    {
      value: 'item-4',
      question: 'How do I apply for a Bill Point POS machine?',
      answer: 'You can apply for a Bill Point POS machine by visiting our website or contacting our sales team for more information.',
    },
    {
      value: 'item-5',
      question: 'Can I integrate the Bill Point POS machine with my existing systems?',
      answer: 'Yes, the Bill Point POS machine can integrate seamlessly with your existing systems for smoother operations.',
    },
    {
      value: 'item-6',
      question: 'What kinds of businesses can use the Bill Point POS machine?',
      answer: 'The Bill Point POS machine is versatile and suitable for a wide range of businesses, from retail stores to restaurants and service-based industries.',
    },
  ]

  return (
    <motion.div 
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={containerVariants}
      className="bg-white py-12 px-6"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-4">
          Checkout Our <span className="text-orange-500">FAQ</span>
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center text-gray-600 mb-8">
          Our FAQ section answers common questions about Bill Point POS machines, including application processes and pricing. For further assistance, our support team is ready to help.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Accordion type="single" className="grid grid-cols-1 md:grid-cols-2 w-full gap-4" collapsible>
            {faqItems.map(({ value, question, answer }) => (
              <AccordionItem key={value} value={value}>
                <AccordionTrigger
                  onClick={() => handleToggle(value)}
                  className={`flex justify-between items-center text-left text-gray-700 font-semibold p-4 hover:bg-gray-100 ${
                    openItem === value ? 'text-orange-500' : ''
                  }`}
                >
                  <span>{question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 p-4">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </motion.div>
  )
}