import POSForm from '@/components/pos form/PosForm'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "POS Application form Payment | Blord",
  description: "Simplify Your Business With Our POS Solutions. Make Bill Payments Effortless With Our Cutting-Edge POS Systems.",
};

function ApplyForPosPage() {
  return (
    <div className='mt-20'>
        <POSForm/>

    </div>
  )
}

export default ApplyForPosPage