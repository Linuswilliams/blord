"use client"

import { useRef, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Clipboard, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import SuccessModal from "../success modal/SuccessModal"
import PaymentModal from "../payment modal/PaymentModal"
import PaymentInfoModal from "../payment info/PaymentInfo"

interface FormInputs {
  fullName: string
  email: string
  phoneNumber: string
  posType: string
  businessName: string
  areYouAMerchant: string
  address: string
  state: string
  additionalComments: string,
  file: FileList
}

const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="relative mb-6">
    <div className="absolute -top-3 left-4 right-4 h-8 bg-orange-600 rounded-t-lg z-10"></div>
    <div className="relative bg-orange-500 flex flex-col items-center rounded-lg pt-6 pb-4 px-4 z-20">
      <h3 className="text-white font-bold text-lg mb-2 -mt-5 text-center">{title}</h3>
      {children}
    </div>
  </div>
)

export default function Component() {
  const [copied, setCopied] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
  const [fileName, setFileName] = useState("No file selected")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [imageUri, setImageUri] = useState(false)
  const [isImageUploaded, setIsImageUploaded] = useState(false)

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data)
    // Handle form submission
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    uploadImage(file)
    setFileName(file ? file.name : "No file selected")
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click()
   
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePaymentInfoModalOpen = () => {
    setIsModalOpen(true)
  }

  const uploadImage = async (uri) => {
    setIsImageLoading(true);
    try {
      const formData = new FormData();
      const fileType = uri.split('.').pop();

      formData.append('file', {
        uri,
        type: `image/${fileType}`,
        name: `upload.${fileType}`,
      });

      formData.append('upload_preset', 'a5wslp5p');

      const response = await fetch('https://api.cloudinary.com/v1_1/daiby9gsb/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setImageUri(data.secure_url);
        setIsImageLoading(true) 
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsImageLoading(false);
    }
  };


  return (
    <>
    <PaymentInfoModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} handlePaymentInfoModalOpen={undefined}/>
    <PaymentModal handlePaymentInfoModalOpen={handlePaymentInfoModalOpen}/>
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Apply for Your Bill Point <span className="text-red-500">POS</span> Machine Today!</h1>
      <p className="text-center mb-8 text-sm text-gray-600">
        Ready to simplify your payment process? Before submitting your application, please ensure that the payment for the POS machine is made to the account details below. Your application
        will not be processed until the payment is confirmed.
      </p>
      <div className="grid md:grid-cols-1 gap-8">
        <div>
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
                    message: "Invalid email address"
                  }
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
                    message: "Phone number must be at least 10 digits"
                  }
                })}
                placeholder="Enter your Phone Number"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
            </div>
            <div>
              <Label htmlFor="posType">POS machine type</Label>
              <Select onValueChange={(value) => register("posType").onChange({ target: { value } })}>
                <SelectTrigger id="posType">
                  <SelectValue placeholder="Select POS machine type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="android">Android Machine</SelectItem>
                  <SelectItem value="kernel">Kernel Machine</SelectItem>
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
              <Select onValueChange={(value) => register("areYouAMerchant").onChange({ target: { value } })}>
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
              <Label htmlFor="address">Address(City,Street)</Label>
              <Input
                id="address"
                {...register("address", { required: "Address is required" })}
                placeholder="Enter address"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
            <div>
              <Label htmlFor="state">What State do you currently reside</Label>
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
        
            <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <Input
              type="text"
              readOnly
              value={fileName}
              className="bg-gray-100 cursor-default"
              onClick={handleChooseFile}
            />
            <input
              type="file"
              {...register("file", { required: "File is required" })}
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
          <Button type="button" variant="outline" onClick={handleChooseFile}>
            {isImageLoading ? 'uploading' : isImageUploaded ?'uploaded':'Choose file'}
          </Button>
        </div>
        {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>}
        
        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
          Submit application
        </Button>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}