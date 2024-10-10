"use client"

import { useState, useEffect } from 'react'
import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleResize()
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const closeMenu = () => setIsOpen(false)

  const isHomePage = pathname === '/'
  const textColor = isHomePage
    ? isScrolled ? 'text-black' : 'text-white'
    : 'text-black'
  const buttonStyle = isHomePage
    ? isScrolled ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'
    : 'bg-black text-white hover:bg-gray-800'

  const menuItems = [
    {link:'/', name: 'Home'},
    {link:'/contact', name: 'Contact'},
    {link:'/apply-for-pos', name: 'Apply For POS'},
  ]

  const getItemColor = (itemLink: string) => {
    return pathname === itemLink ? 'text-orange-500' : textColor
  }

  const navigateToApplyToPos = () =>{
    console.log('clicked')
     router.push('/apply-for-pos')
    }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <Link href='/'>
            <div className="text-2xl font-bold">
              <Image src={'/logo.png'} width={50} height={50} alt='logo'/>
            </div>
            </Link>
            <ul className="hidden ml-32 md:flex space-x-14">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.link} className={`${getItemColor(item.link)} cursor-pointer hover:underline`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <Button onClick={navigateToApplyToPos} className={`px-10 py-5 ${buttonStyle}`}>Apply Now</Button>
          </div>
          <button onClick={toggleMenu} className={`block md:hidden ${textColor}`}>
            {isOpen ? <X color='black' size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 flex items-start justify-start pt-20"
          >
            <ul className="w-full px-6">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-6"
                >
                  <Link 
                    href={item.link} 
                    className={`text-2xl  text-black`}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
                className="mt-8"
              >
                <Button onClick={navigateToApplyToPos} className="px-8 py-4 text-lg bg-black  hover:bg-gray-800">
                  Apply Now
                </Button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}