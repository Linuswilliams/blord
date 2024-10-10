import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      {/* Container for content */}
      <div className="mx-auto px-4 lg:px-8">
        {/* Grid for desktop and stack for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Section: Logo and Address */}

            <div className="flex space-x-4 mb-4">
                <div>
                <Image src="/logo.png" width={380} height={380} alt="Logo" />
                </div>
            <div>

            <p className="text-sm">
              BillPoint is a leading payment service provider that enables users
              to easily and securely pay for various bills and subscriptions.               Address: No. 29 Dr. Okey Anueyiagu Road Awka, <br />
              Anambra State, Nigeria
            </p>
            </div>
          </div>

          {/* Middle Section: Services List */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={'#'}>
                Airtime
                </Link>
                </li>
              <li>
                <Link href={'#'}>
                Data
                </Link>
                </li>
              <li>
                <Link href={'#'}>
                Electricity Bills
                </Link>
                </li>
              <li>
                <Link href={'#'}>
                Cable Subscription
                </Link>
                </li>
              <li>
                <Link href={'#'}>
                Bet Funding
                </Link>
                </li>
              <li>
                <Link href={'#'}>
                Flight Booking
                </Link>
                </li>
              <li>
                <Link href={'#'}>
                Giftcards
                </Link>
                </li>
            </ul>
          </div>

          {/* Right Section: Company Info and Social Media */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <Link href={'#'}>
                About Us
                </Link>
                </li>
              <li>
                <Link href={'#'}>
                Privacy Policy
                </Link>
                </li>
              <li>
                <Link href={'#'}>
                Terms of Use
                </Link>
                </li>
              <li>
                <Link href={'#'}>
                Contact Us
                </Link>
                </li>
            </ul>

            {/* Contact Info */}
          </div>

          <div className='mt-8 md:mt-0'>
          <div className="mb-4">
              <h4 className="text-sm font-semibold">Info</h4>
              <p className="text-sm">+234 703 456 0269</p>
              <Link href="mailto:support@billpointpos.co" className="text-sm">
                support@billpointpos.co
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <Link href="#"><Facebook className="text-white w-6 h-6" /></Link>
              <Link href="#"><Linkedin className="text-white w-6 h-6" /></Link>
              <Link href="#"><Instagram className="text-white w-6 h-6" /></Link>
              <Link href="https://billpoint.co/#"><Twitter className="text-white w-6 h-6" /></Link>
              <Link href="#"><Youtube className="text-white w-6 h-6" /></Link>
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
