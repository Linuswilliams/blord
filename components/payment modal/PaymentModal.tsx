'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import axios from 'axios';
import { Label } from '../ui/label';

const PaymentModal = ({ handlePaymentInfoModalOpen }) => {
  const [posMachineType, setPosMachineType] = useState("Android POS Machine - ₦120,000");

  const navigateToWhatsapp = async () => {
    try {
      const defaultPhoneNumber = '2347034560269'; // Remove the + for the WhatsApp URL
      const defaultMessage = 'Hello! my name is _______ and I just made a payment for ___ pos and here is my payment receipt';
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${defaultPhoneNumber}&text=${encodeURIComponent(defaultMessage)}`;
      
      window.open(whatsappUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-[50] bg-opacity-[.5]">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg">
        {/* Modal Heading */}
        <h2 className="text-xl font-bold text-center mb-4">Payment Required Before Proceeding</h2>
        <p className="text-center text-gray-600 mb-6">
          Before you can fill out the form, please make a payment for the selected POS machine.
        </p>

        {/* POS Machine Type Selector */}
        <div className="mb-6">
          <Label htmlFor="posMachineType">POS machine type</Label>
          <Select onValueChange={setPosMachineType}>
            <SelectTrigger id="posMachineType" className="w-full">
              <SelectValue placeholder="Select POS machine type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Android POS Machine - ₦120,000">Android POS Machine - ₦120,000</SelectItem>
              <SelectItem value="Kernel POS Machine - ₦60,000">Kernel POS Machine - ₦60,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button onClick={handlePaymentInfoModalOpen} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
            Make Payment
          </Button>
          <Button
            onClick={navigateToWhatsapp}
            variant="outline"
            className="w-full border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white py-3"
          >
            I have made this payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
