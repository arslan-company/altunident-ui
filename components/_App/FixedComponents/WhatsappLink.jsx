import { useContext } from 'react';
import { GlobalContext } from '../../../context';

function FixedLink() {
  const { layoutConfig } = useContext(GlobalContext);
  const { WHATSAPP_LINK } = layoutConfig;

  return (
    <div className="fixed-link-wrapper">
      <a href={WHATSAPP_LINK.HREF} target="_blank" rel="noreferrer" className="fixed-link">
        <img src="/img/social-media/whatsapp.png" alt="Atakent Whatsapp Bağlantısı" />
      </a>

      <div className="fixed-link-title">
        Whatsapp
      </div>
    </div>
  );
}

export default FixedLink;
