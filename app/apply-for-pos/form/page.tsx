'use client';

import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SuccessModal from "@/components/success modal/SuccessModal";
import PaymentModal from "@/components/payment modal/PaymentModal";
import PaymentInfoModal from "@/components/payment info/PaymentInfo";
import { axios } from "@/lib/axios";

interface FormInputs {
  fullName: string;
  email: string;
  phoneNumber: string;
  posType: string;
  businessName: string;
  areYouAMerchant: string;
  address: string;
  state: string;
  additionalComments: string;
  imageUrl: FileList;
}

export default function Component() {
  const { register, reset, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const [fileName, setFileName] = useState("No file selected");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posType, setPosType] = useState('');
  const [areYouAMerchant, setAreYouAMerchant] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(true); // Payment modal open state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null); 

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!imageUri) {
      alert("Please upload an image first");
      return;
    }

    setIsLoading(true);

    const formDataToSubmit = {
      ...data,
      imageUrl: imageUri,
      areYouAMerchant,
      posType,
    };

    try {
      const res = await axios.post("/api/pos-application/post", formDataToSubmit);
      const result = await res.data;

      setIsOpen(true);
      // console.log(result);
      reset();
    } catch (error) {
      // console.error("Form submission error:", error);
      alert(`An error occurred while submitting the form: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsImageLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "a5wslp5p");

      const response = await fetch("https://api.cloudinary.com/v1_1/daiby9gsb/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setImageUri(data.secure_url);
        setIsImageUploaded(true);
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      // console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePaymentInfoModalOpen = () => {
    setIsModalOpen(true);
  };

  const handlePaymentModalOpen = () => {
    setIsPaymentModalOpen(!isPaymentModalOpen);
  };


  return (
    <>
      <SuccessModal isOpen={isOpen} handleClose={handleClose} />
      <PaymentModal
      handlePaymentModalOpen={handlePaymentModalOpen}
      isOpen={isPaymentModalOpen}
          handlePaymentInfoModalOpen={handlePaymentInfoModalOpen}
        />
      <PaymentInfoModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} handlePaymentInfoModalOpen={handlePaymentInfoModalOpen} />

      <div className="container mt-20 mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Apply for Your Bill Point <span className="text-red-500">POS</span> Machine Today!
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              {...register("fullName", { required: "Full name is required" })}
              placeholder="Enter Full Name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber", {
                required: "Phone number is required",
                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 digits",
                },
              })}
              placeholder="Enter your Phone Number"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <Label htmlFor="posType">POS machine type</Label>
            <Select onValueChange={(value) => setPosType(value)}>
              <SelectTrigger id="posType">
                <SelectValue placeholder="Select POS machine type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="android pos machine">Android POS Machine</SelectItem>
                <SelectItem value="kernel pos machine">Kernel POS Machine</SelectItem>
              </SelectContent>
            </Select>
            {errors.posType && <p className="text-red-500 text-sm mt-1">{errors.posType.message}</p>}
          </div>

          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              {...register("businessName", { required: "Business name is required" })}
              placeholder="Enter Business Name"
            />
            {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>}
          </div>

          <div>
            <Label htmlFor="areYouAMerchant">Are you a Merchant</Label>
            <Select onValueChange={(value) => setAreYouAMerchant(value)}>
              <SelectTrigger id="areYouAMerchant">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
            {errors.areYouAMerchant && <p className="text-red-500 text-sm mt-1">{errors.areYouAMerchant.message}</p>}
          </div>

          <div>
            <Label htmlFor="address">Address (City, Street)</Label>
            <Input
              id="address"
              {...register("address", { required: "Address is required" })}
              placeholder="Enter address"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <Label htmlFor="state">What State do you currently reside in?</Label>
            <Input
              id="state"
              {...register("state", { required: "State is required" })}
              placeholder="Enter state"
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
          </div>

          <div>
            <Label htmlFor="additionalComments">Additional Comments</Label>
            <Textarea
              id="additionalComments"
              {...register("additionalComments")}
              placeholder="Enter any additional comments"
            />
          </div>

          <div className="flex items-end space-x-2">
            <div className="flex-grow">
              <Label htmlFor="fileUpload">Upload Payment Proof</Label>
              <Input
                type="text"
                readOnly
                value={fileName}
                className="bg-gray-100 cursor-default"
              />
            </div>

            <Button type="button" className="bg-orange-500" onClick={handleFileButtonClick}>
              {
                isImageLoading ? 'uploading' : isImageUploaded ?'uploaded' :'Upload'
              }
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <Button 
            className="w-full bg-orange-500"
          >
            {
              isLoading ? 'Submitting...' :'Submit'
            }
          </Button>
        </form>
      </div>
    </>
  );
}
