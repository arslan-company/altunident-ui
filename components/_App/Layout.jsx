import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';

import { GlobalContext } from '../../context';

import GoTop from './FixedComponents/GoTop';
import Preloader from './Preloader';
import WhatsappLink from './FixedComponents/WhatsappLink';
import AppointmentPopup from './Popups/AppointmentPopup';
import MakeAnAppointmentButton from './FixedComponents/MakeAnAppointmentButton';
import CampaignsPopup from './Popups/CampaignsPopup';

import Box from '../base/Box';

function Layout({ children }) {
  // Preloader
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoader(false), 500);
  }, []);

  // config
  const { layoutConfig } = useContext(GlobalContext);
  const {
    GO_TOP,
    WHATSAPP_LINK,
    CAMPAIGNS_POPUP,
    MAKE_AN_APPOINTMENT_BUTTON,
    PRELOADER,
  } = layoutConfig;

  return (
    <div className="layout">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      {children}

      {PRELOADER && (
        loader ? (<Preloader />) : null
      )}

      {/* <AnnouncementPopup /> */}
      <AppointmentPopup />

      <Box
        cssx={{
          position: 'fixed',
          right: '30px',
          bottom: '20px',
          display: 'flex',
          gap: '1rem',
          zIndex: 1100,
        }}
      >
        {GO_TOP && <GoTop scrollStepInPx="100" delayInMs="10.50" />}
        {MAKE_AN_APPOINTMENT_BUTTON && <MakeAnAppointmentButton />}
        {WHATSAPP_LINK.DISPLAY && <WhatsappLink />}
        {CAMPAIGNS_POPUP && <CampaignsPopup />}
      </Box>
    </div>
  );
}

export default Layout;
