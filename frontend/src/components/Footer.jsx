import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    // Ikkada future lo backend API add chesukovachu
    setEmail("");
  };

  return (
    <footer className="w-full mt-20 sm:mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Side: Newsletter */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-400 mb-6 max-w-lg leading-relaxed">
                Get the latest updates, tips, and exclusive content delivered
                straight to your inbox. Join our newsletter and never miss
                important announcements.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-white/20 rounded-lg bg-[#1a1a1a] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black font-bold tracking-wider rounded-lg transition-colors duration-200 hover:bg-gray-200 active:scale-95"
                >
                  SUBSCRIBE
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            {/* Right Side: Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/collection" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Collection
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Contact Center
                  </Link>
                </li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} X-Shop. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;