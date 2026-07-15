import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} FirstStep AI. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Built with React, Tailwind CSS & Vite
        </p>
      </div>
    </footer>
  );
};

export default Footer;