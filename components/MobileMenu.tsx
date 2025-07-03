"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg bg-dark-200/50 border border-primary-200/20"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-dark-100/95 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary-200/20">
              <Link href="/" className="flex items-center gap-3" onClick={toggleMenu}>
                <div className="blue-gradient rounded-full p-2">
                  <Image src="/logo.svg" alt="InterviewAce Logo" width={24} height={24} />
                </div>
                <h2 className="text-xl font-bold text-primary-100">InterviewAce</h2>
              </Link>
              <button onClick={toggleMenu} className="p-2">
                <Image src="/window.svg" alt="Close" width={24} height={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-8">
              <div className="space-y-6">
                <Link 
                  href="/" 
                  className="flex items-center gap-4 text-lg text-white hover:text-primary-200 transition-all duration-150"
                  onClick={toggleMenu}
                >
                  <Image src="/globe.svg" alt="Dashboard" width={24} height={24} />
                  Dashboard
                </Link>
                <Link 
                  href="/interview" 
                  className="flex items-center gap-4 text-lg text-white hover:text-primary-200 transition-all duration-150"
                  onClick={toggleMenu}
                >
                  <Image src="/tech.svg" alt="Create" width={24} height={24} />
                  Create Interview
                </Link>
                <Link 
                  href="/interviews" 
                  className="flex items-center gap-4 text-lg text-white hover:text-primary-200 transition-all duration-150"
                  onClick={toggleMenu}
                >
                  <Image src="/star.svg" alt="Interviews" width={24} height={24} />
                  My Interviews
                </Link>
              </div>
            </nav>

            {/* CTA Button */}
            <div className="p-6 border-t border-primary-200/20">
              <Button asChild className="btn-primary w-full" onClick={toggleMenu}>
                <Link href="/interview">Start New Interview</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;