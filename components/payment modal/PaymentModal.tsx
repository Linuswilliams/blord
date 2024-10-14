'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

const PaymentModal = ({ handlePaymentInfoModalOpen, handlePaymentModalOpen, isOpen }) => {
  const [posMachineType, setPosMachineType] = useState("Android POS Machine - ₦120,000");

  if (!isOpen) return null;

  return (
    <div onClick={handlePaymentModalOpen} className="fixed p-5 inset-0 flex items-center justify-center bg-black z-[50] bg-opacity-[.5]">
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg">
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
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
