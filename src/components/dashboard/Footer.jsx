import React from 'react';
import { SocialIcon } from 'react-social-icons';
import '../../styles/dashboard/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 Akinzo Tech. All Rights Reserved.</p>
      <div className="social-icons">
        <SocialIcon url="https://facebook.com" />
        <SocialIcon url="https://instagram.com" />
        <SocialIcon url="https://twitter.com" />
        <SocialIcon url="https://linkedin.com" />
      </div>
    </footer>
  );
};

export default Footer;
