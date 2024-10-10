'use client'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import axios from "axios";
import SuccessModal from "../success modal/SuccessModal";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission
const [isSubmitted, setIsSubmitted] = useState(false)
const [isOpen, setIsOpen] = useState(false)
const [howDidYouHear, setHowDidYouHear] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      reason: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Start the loading state
    console.log(data);
    try {
        const {fullName, email,phoneNumber, reason, message} = data

        console.log(howDidYouHear, 'how')
        const body = {
            fullName,
            email,
            phoneNumber, 
            reason,
            howDidYouHear,
            message
        }
        const response = await axios.post('/api/contact', body)

        setIsOpen(true)
        setIsSubmitted(true)
        console.log(response)
        setIsSubmitting(false);
   
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false); // Stop loading if there's an error
    }
  };
  

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
    <SuccessModal text='Your message has been received and you will be contacted shortly' handleClose={handleClose} isOpen={isOpen}/>
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-4">Get in Touch with Us</h2>
      <p className="text-center mb-8">
        We're here to help! Whether you have questions, feedback, or need assistance, don't hesitate to reach out. Contact
        our friendly team via email, phone, or by filling out our simple form. We look forward to hearing from you!
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Full Name */}
          <div className="flex flex-col w-full">
            <label htmlFor="fullName" className="font-medium">Full Name</label>
            <Input
              id="fullName"
              {...register("fullName", { required: "Full Name is required" })}
              placeholder="Enter your full name"
              className="border border-gray-300 p-2"
            />
            {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium">Email</label>
            <Input
              id="email"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email" } })}
              placeholder="Enter your email"
              className="border border-gray-300 p-2"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 my-10">
          {/* Phone Number */}
          <div className="flex flex-col w-full">
            <label htmlFor="phoneNumber" className="font-medium">Phone Number</label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber", { required: "Phone Number is required" })}
              placeholder="Enter your phone number"
              className="border border-gray-300 p-2"
            />
            {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
          </div>

          {/* Reason for Contact */}
          <div className="flex flex-col">
            <label htmlFor="reason" className="font-medium">Reason for Contact</label>
            <Input
              id="reason"
              {...register("reason")}
              placeholder="Optional"
              className="border border-gray-300 p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">How Did You Hear About Us?</label>
            <Select onValueChange={(value)=> setHowDidYouHear(value)} {...register("howDidYouHear")} name="howDidYouHear">
              <SelectTrigger className="border border-gray-300 p-2">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Message */}
        <div className="md:col-span-2 flex flex-col">
          <label htmlFor="message" className="font-medium">Message</label>
          <Textarea
            id="message"
            {...register("message", { required: "Message is required" })}
            placeholder="Enter your message"
            className="border border-gray-300 p-2"
          />
          {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-10 flex justify-center">
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? "Submitting..." : "Submit Message"}
            {!isSubmitting && <ArrowRight className="ml-3" />}
          </Button>
        </div>
      </form>

      {/* Office Information */}
      <div className="container mx-auto px-2 py-8">
        <h2 className="text-2xl font-bold mb-4">Our Office Locations</h2>
        <div className="border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold">Anambra Office</h3>
          <p className="text-gray-700 mb-4">
            No. 29 Dr. Okey Anueyiagu Road Awka, Anambra State, Nigeria
          </p>
          <div className="items-start space-y-4 md:items-center gap-4">
            <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-md">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700">support@billpointpos</span>
            </div>

            <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-md">
              <Phone className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700">+234 703 456 0269</span>
            </div>

            <div className="flex max-w-[500px] items-center space-x-2 bg-gray-100 p-3 rounded-md">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700">
                No. 29 Dr. Okey Anueyiagu Road Awka, Anambra State, Nigeria
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactForm;
