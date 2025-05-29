
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderLogo = () => {
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsLogoVisible(true), 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleLogoClick = useCallback(() => {
    if (location.pathname === '/') {
      const heroSection = document.querySelector('section');
      heroSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const heroSection = document.querySelector('section');
        heroSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.pathname, navigate]);

  const logoClasses = `flex items-center gap-2 transition-all duration-500 ${
    isLogoVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
  } cursor-pointer`;

  return (
    <div className={logoClasses} onClick={handleLogoClick}>
      <img
        src="/lovable-uploads/62342ed0-cfb6-48e6-9064-63e2c615ec81.png"
        alt="VR Automatize"
        className="h-10 w-10"
        width="40"
        height="40"
      />
      <span className="text-xl font-semibold">VR Automatize</span>
    </div>
  );
};

export default HeaderLogo;
