import React from 'react';
import Image from "next/image";
import logo from "../../../assets/sigma-logo.png"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-around">
        <div className="mb-8 md:mb-0">
            <Image src={logo} alt={"logo"} width={200} style={{marginLeft:'-0.5rem'}}/>

          <h2 className="text-white text-xl font-bold mb-2">sales@sigmawholesaletexas.com</h2>
          <p className="text-sm mb-4">
          (832) 649-2049
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:gap-16 md:grid-cols-3">
          <div>
            <h3 className="text-white font-semibold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Shop</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Site Map</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">POLICY</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white">Return Policy</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">TOP CATEGORIES</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white">Smoke Shop</a></li>
              <li><a href="#" className="hover:text-white">Vape Shop</a></li>
              <li><a href="#" className="hover:text-white">CBD</a></li>
              <li><a href="#" className="hover:text-white">Delt8</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
