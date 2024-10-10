import ContactForm from '@/components/contact form/ContactForm'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Contact form | Blord",
    description: "Simplify Your Business With Our POS Solutions. Make Bill Payments Effortless With Our Cutting-Edge POS Systems.",
  };

function ContactPage() {
  return (
    <div className='mt-20'>
        <ContactForm/>
    </div>
  )
}

export default ContactPage