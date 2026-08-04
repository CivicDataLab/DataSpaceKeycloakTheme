import React from "react";
import logoPngUrl from "../assets/dataspacelogosep2025.png";

export const CivicLogo: React.FC = () => {
  return (
    <div className="civic-brand-logo">
      <img 
        src={logoPngUrl}
        alt="Civic DataSpace Logo" 
        style={{ maxWidth: '400px', width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default CivicLogo;
