import React, { useState, useEffect } from 'react';

function GoTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener('scroll', toggleVisibility);

    return () => {
      document.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div className="go-top" onClick={scrollToTop}>
          <i className="bx bx-chevrons-up" />
          <i className="bx bx-chevrons-up" />
        </div>
      )}
    </div>
  );
}

export default GoTop;
