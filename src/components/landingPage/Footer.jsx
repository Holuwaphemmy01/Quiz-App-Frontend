// import React from 'react';
// import{SocialIcon} from 'react-social-icons';
// import '../../styles/landingPage/footer.css';



// const Footer = () => {
//   return (
//     <footer>
//       <p>&copy; 2025 Akinzo Tech. All Rights Reserved.</p>
//       <SocialIcon url="https://facebook.com" style={{ margin: '0 8px '}} />
//         <SocialIcon url="https://instagram.com" style={{ margin: '0 8px' }} />
//         <SocialIcon url="https://twitter.com" style={{ margin: '0 8px' }} />
//         <SocialIcon url="https://linkedin.com" style={{ margin: '0 8px' }} />
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { SocialIcon } from 'react-social-icons';
import '../../styles/landingPage/footer.css';

const Footer = () => {
  return (
    <footer>
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
