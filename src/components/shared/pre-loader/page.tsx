import React from 'react';

function Preloader() {
  return (
    <div className="loader-wrapper">
      <div className="loader" />
      <div className="loader-section section-left" />
      <div className="loader-section section-right" />
    </div>
  );
}

export default Preloader;
