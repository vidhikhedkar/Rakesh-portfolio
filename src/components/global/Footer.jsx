import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#f4f6f8] py-12 px-4 md:px-10 flex flex-col items-center justify-center text-center">
      <div className="max-w-300 w-full flex flex-col items-center gap-6">

        {/* Logo */}
         <Link to="/" className="text-2xl md:text-3xl font-bold tracking-tight text-[#171719]">
          Rakesh<span className="text-[#5870EE]">.P</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-[12px] font-semibold tracking-[1.5px] text-[#8c92a4]">
          <li>
            <a href="/" className="hover:text-[#5870EE] transition-colors">
              HOME
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-[#5870EE] transition-colors">
              ABOUT
            </a>
          </li>
          <li>
            <a href="/works" className="hover:text-[#5870EE] transition-colors">
              WORKS
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-[#5870EE] transition-colors">
              CONTACT
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <div className="text-[13px] text-[#8c92a4] mt-2">
          © All rights reserved by{' '}
          <span className="text-[#5870EE] font-medium">Rakesh Parvathneni</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;