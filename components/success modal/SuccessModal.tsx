import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const SuccessModal = ({isOpen, text='Thank you for your application! Our team will contact you shortly.', handleClose}:any) => {



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 text-center shadow-lg w-96">
        <div className="flex justify-center items-center">
          <Image src={'/shield.svg'}alt='shield' width={100} height={100}/>
        </div>
        <h2 className="text-2xl font-bold mt-4">Success!!!</h2>
        <p className="mt-2">{text}</p>
        <button
          onClick={handleClose}
          className="bg-orange-500 text-white px-6 py-2 mt-6 rounded-lg shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
