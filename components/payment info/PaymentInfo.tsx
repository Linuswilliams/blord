'use client';

import { useState } from 'react';
import { Check, Clipboard, X } from 'lucide-react'; // Icons

import { Button } from '../ui/button';

const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="relative mb-6">
      <div className="absolute -top-3 left-4 right-4 h-8 bg-orange-600 rounded-t-lg z-10"></div>
      <div className="relative bg-orange-500 flex flex-col items-center rounded-lg pt-6 pb-4 px-4 z-20">
        <h3 className="text-white font-bold text-lg mb-2 -mt-5 text-center">{title}</h3>
        {children}
      </div>
    </div>
  )

  
const PaymentInfoModal = ({handlePaymentInfoModalOpen,setIsModalOpen, isModalOpen}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200]">
          <div className="relative p-8 rounded-lg max-w-lg w-full shadow-lg">
            {/* Close Button */}
            <Button
              variant="ghost"
              className="absolute top-4 -right-4"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </Button>

            <div className="w-full">
              {/* Price InfoCard */}
              <InfoCard title="Price">
                <ul className="list-disc list-inside text-white">
                  <li>Android POS Machine: ₦120,000</li>
                  <li>Kernel POS Machine: ₦60,000</li>
                </ul>
              </InfoCard>

              {/* Recipient Bank InfoCard */}
              <InfoCard title="Recipient Bank">
                <p className="text-white text-center text-xl">Palmpay</p>
              </InfoCard>

              {/* Account Name InfoCard */}
              <InfoCard title="Account Name">
                <p className="text-white text-center text-xl">Billpoint Technology Limited</p>
              </InfoCard>

              {/* Account Number InfoCard */}
              <InfoCard title="Account Number">
                <div className="flex justify-between text-center items-center">
                  <p className="text-white text-xl mr-5">8883377940</p>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => copyToClipboard("8883377940")}
                    className="bg-white text-orange-500 hover:bg-gray-100"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                    <span className="sr-only">
                      {copied ? "Copied" : "Copy account number"}
                    </span>
                  </Button>
                </div>
              </InfoCard>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentInfoModal;
