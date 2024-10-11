import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Apple, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      {/* Container for content */}
      <div className="mx-auto px-4 lg:px-8">
        {/* Grid for desktop and stack for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
          {/* Left Section: Logo and Address */}
          <div >
            <div className="flex space-x-4 mb-4">
            <div>
              <Image src="/logo.png" width={380} height={380} alt="Logo" />
            </div>
            <div>
              <p className="text-sm">
                BillPoint is a leading payment service provider that enables users
                to easily and securely pay for various bills and subscriptions.
                <br/>
                Address: No. 29 Dr. Okey Anueyiagu Road Awka, <br />
                Anambra State, Nigeria
              </p>
            </div>
            </div>
          </div>

          {/* Services and Company Info in two columns on mobile, three on desktop */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Middle Section: Services List */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm list-disc">
                <li className="ml-4">
                  <Link href={'#'}>Airtime</Link>
                </li>
                <li className="ml-4">
                  <Link href={'#'}>Data</Link>
                </li>
                <li className="ml-4">
                  <Link href={'#'}>Electricity Bills</Link>
                </li>
                <li className="ml-4">
                  <Link href={'#'}>Cable Subscription</Link>
                </li>
                <li className="ml-4">
                  <Link href={'#'}>Bet Funding</Link>
                </li>
                <li className="ml-4">
                  <Link href={'#'}>Flight Booking</Link>
                </li>
                <li className="ml-4">
                  <Link href={'#'}>Giftcards</Link>
                </li>
              </ul>
            </div>

            {/* Right Section: Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm mb-4 list-disc">
                <li className="ml-4">
                  <Link href={'#'}>About Us</Link>
                </li>
                <li className="ml-4">
                  <Link href={'#'}>Privacy Policy</Link>
                </li>
                <li className="ml-4">
                  <Link href={'#'}>Terms of Use</Link>
                </li>
                <li className="ml-4">
                  <Link href={'#'}>Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* Info Section */}
            <div>
              <div className="mb-4 list-disc">
                <h4 className="text-sm font-semibold">Info</h4>
                <li className="text-sm">+234 703 456 0269</li>
                <li>
                  <Link href="mailto:support@billpointpos.co" className="text-sm">
                    support@billpointpos.co
                  </Link>
                </li>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center space-x-4 mt-4">
                <Link href="#"><Facebook className="text-white w-6 h-6" /></Link>
                <Link href="#"><Linkedin className="text-white w-6 h-6" /></Link>
                <Link href="#"><Instagram className="text-white w-6 h-6" /></Link>
                <Link href="https://billpoint.co/#"><Twitter className="text-white w-6 h-6" /></Link>
                <Link href="#"><Youtube className="text-white w-6 h-6" /></Link>
              </div>

              {/* Play Store and App Store Buttons */}
              <div className="flex flex-col space-y-3 mt-4">
                <Link href="https://play.google.com">
                  <div className="flex items-center bg-white text-black px-4  py-2 rounded">
                    {/* <PlayStore className="w-6 h-6 mr-2" /> */}
                    <Image alt='' src='/images.png' width={30} height={20}/>
                    <span className="text-sm">Play Store</span>
                  </div>
                </Link>
                <Link href="https://apps.apple.com">
                  <div className="flex items-center bg-white text-black px-4 py-3 rounded">
                    <Apple className="w-6 h-6 mr-2" />
                    <span className="text-sm">App Store</span>
                  </div>
                </Link>

                {/* <div className='pt-5'>
                  <Image  src={'/scan.png'} width={170} height={170} alt=''/>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
        © 2024 Billpoint. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
