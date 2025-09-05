import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsGridFill } from 'react-icons/bs';
import { HiAdjustments } from 'react-icons/hi';
import { FaTruck, FaPaperPlane, FaUsers, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [activeLink, setActiveLink] = useState('Mission');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { text: 'Mission', icon: <BsGridFill />, path: '/mission' },
    { text: 'Map', icon: <FaUsers />, path: '/map' },
    { text: 'Mine Laying', icon: <FaUsers />, path: '/mine-laying' },
    { text: 'Assets', icon: <HiAdjustments />, path: '/assets' },
    { text: 'Environment', icon: <FaTruck />, path: '/environment' },
    { text: 'Task Order', icon: <FaPaperPlane />, path: '/data-explorer' },
    { text: 'Intelligence', icon: <FaUsers />, path: '/intelligence' },
  ];

  return (
    <nav className="bg-[#515555] relative">
      <div className="md:grid md:grid-cols-12 md:items-center flex items-center justify-between h-16 px-4 md:px-0">
       <Link
  to="/"
  className="md:col-span-3 flex items-center justify-center h-16 bg-[#515555] text-[#1A1C1C] text-3xl font-bold"
  style={{ fontFamily: "'Radio Canada Big', sans-serif" }}
>
  MWDC
</Link>


        <div className="hidden md:flex md:col-span-6 items-center h-16 bg-[#515555] text-white">
          {navLinks.map((link) => {
            const isActive = link.text === activeLink;
            return (
              <Link
                key={link.text}
                to={link.path}
                onClick={() => setActiveLink(link.text)}
                className={`flex items-center justify-center h-full px-4 gap-2 transition-colors duration-200 flex-1 font-bold text-base
                ${isActive ? 'bg-[#1A1C1C] border-t-4 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                style={isActive ? { borderTopColor: '#0A7CAD' } : {}}
              >
                <span style={isActive ? { color: '#0A7CAD' } : {}}>{link.icon}</span>
                <span>{link.text}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block md:col-span-3 h-16 bg-[#515555]"></div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#515555] pb-4">
          <div className="flex flex-col space-y-1 px-2 pt-2 pb-3">
            {navLinks.map((link) => {
              const isActive = link.text === activeLink;
              return (
                <Link
                  key={link.text}
                  to={link.path}
                  onClick={() => {
                    setActiveLink(link.text);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center px-3 py-3 rounded-md text-base font-medium gap-3 transition-colors duration-200
                  ${isActive ? 'bg-[#1A1C1C] text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                  <span style={isActive ? { color: '#0A7CAD' } : {}}>{link.icon}</span>
                  <span>{link.text}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
