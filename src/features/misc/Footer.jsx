import React from "react";
import { FaInstagramSquare, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blueprimary text-white py-4">
      <div className=" pl-5 pr-5 placeholder:mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4">
          <a href="#" className="hover:text-bluesecondary">
            <FaInstagramSquare size={24} />
          </a>
          <a href="#" className="hover:text-bluesecondary">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-bluesecondary">
            <FaTwitter size={24} />
          </a>
        </div>
        <div className="mt-4 md:mt-0">
          <a href="#" className="hover:text-bluesecondary mx-2">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-bluesecondary mx-2">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
