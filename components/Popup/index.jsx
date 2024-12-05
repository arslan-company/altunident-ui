import { useEffect, useState } from 'react';
import InlineSVG from 'react-inlinesvg';

/**
 * @param {{
 * children: React.ReactNode;
 * mode: 'auto' | 'manuel';
 * isOpen: boolean;
 * title: string;
 * config: {
 *   openingTime: number;
 * };
 * controller: (isShow: boolean) => void;
 * }} props
*/
function Popup({
  children,
  controller = () => {},
  isOpen = false,
  mode = 'manuel',
  title,
  config = {
    openingTime: 2000, // auto mode only
  },
}) {
  const [showPopup, setShowPopup] = useState(isOpen);

  const handlePopup = () => {
    setShowPopup(
      (prev) => {
        controller(!prev);
        return !prev;
      },
    );
  };

  useEffect(() => {
    if (mode === 'auto') {
      setTimeout(() => {
        setShowPopup(true);
      }, config.openingTime);
    }
  }, []);

  useEffect(() => {
    setShowPopup(isOpen);
  }, [isOpen]);

  return (
    <div
      className={`
        popup-screen ${showPopup ? 'show' : 'hide'}`}
    >
      <div className="popup-container">
        <div className={`popup-header ${title && 'with-title'}`}>
          {title && (
            <div className="popup-title">
              {title}
            </div>
          )}

          <button
            className="popup-close-button"
            type="button"
            onClick={handlePopup}
            title="Close"
          >
            <InlineSVG src="/icons/close.svg" width={25} fill="#fff" />
          </button>
        </div>
        <div className="popup-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Popup;
