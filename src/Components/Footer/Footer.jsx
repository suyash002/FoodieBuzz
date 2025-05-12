import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-header">
        <h2>FoodieBuzz</h2>
      </div>

      <div className="footer-section">
        <h4>About Us</h4>
        <ul>
          <li>Who We Are</li>
          <li>Our Story</li>
          <li>Careers</li>
          <li>Blog</li>
          <li>Press</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>For Restaurants</h4>
        <ul>
          <li>Partner With Us</li>
          <li>Business Solutions</li>
          <li>Advertising</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Help</h4>
        <ul>
          <li>FAQs</li>
          <li>Report an Issue</li>
          <li>Delivery Policies</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Legal</h4>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <li>Security</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Social Links</h4>
        <ul>
          <li>Instagram</li>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>LinkedIn</li>
        </ul>
      </div>

      <div className="footer-section footer-logo">
      <div className="logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<circle cx="32" cy="32" r="28" fill="#f4a261" stroke="black" strokeWidth="2"/>

<line x1="20" y1="24" x2="44" y2="40" stroke="white" strokeWidth="2"/>
<line x1="44" y1="24" x2="20" y2="40" stroke="white" strokeWidth="2"/>

<path d="M12 20C16 16 32 16 36 20" stroke="black" strokeWidth="2"/>
<path d="M12 24C16 20 32 20 36 24" stroke="black" strokeWidth="2"/>
<path d="M12 28C16 24 32 24 36 28" stroke="black" strokeWidth="2"/>

</svg>

        FoodieBuzz
      </div>
        <p>Food Delivery Service</p>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Food Delivery, All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
