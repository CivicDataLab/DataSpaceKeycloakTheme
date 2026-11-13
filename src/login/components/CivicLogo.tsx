import React from "react";
import logoUrl from "../assets/civicdataspace-logo-v2.svg";

export const CivicLogo: React.FC = () => {
  return (
    <div className="civic-brand-logo">
      <img 
        src={logoUrl}
        alt="Civic DataSpace Logo" 
        style={{ maxWidth: '400px', width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default CivicLogo;
