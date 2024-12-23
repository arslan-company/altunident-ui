import {
  createContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import mockLanguages from '../mock_data/languages/languages.json';

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const router = useRouter();
  const localePath = router.locale;
  const { hospitalSlug } = router.query;

  // states
  const [languages, setLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState({});
  const [defaultPathname] = useState('atakent-hospital');
  const hospitalSlugUrl = hospitalSlug === undefined || hospitalSlug === defaultPathname ? `/${defaultPathname}` : `/${hospitalSlug}`;
  const [appointmentLink, setAppointmentLink] = useState('https://atakent.kendineiyibak.app/');
  const [appointmentPopup, setAppointmentPopup] = useState({
    DISPLAY: false,
    CURRENT_DATA: undefined,
    DEFAULT_DATA: [
      {
        id: 1,
        hospitalName: 'Yalova Atakent Hastanesi',
        href: 'https://atakent.kendineiyibak.app/',
      },
      {
        id: 2,
        hospitalName: 'Kocaeli Atakent Cihan Hastanesi',
        href: 'https://atakent.kendineiyibak.app/',
      },
      {
        id: 3,
        hospitalName: 'Orhangazi Atakent Cerrahi Tıp Merkezi',
        href: 'https://randevu.meddata.com.tr/atakent-orhangazi/',
      },
      {
        id: 4,
        hospitalName: 'Gemlik Atakent Tıp Merkezi',
        href: 'https://randevu.meddata.com.tr/atakent-gemlik/',
      },
    ],
  });

  // functions
  /*
  * When an onClick event runs and the popup is opened, what data
  * should be displayed must be entered as a parameter to the function.
  */
  const showAppointmentPopup = (popupData) => {
    if (popupData) {
      // Checks if the popup data is valid.
      if (!Array.isArray(popupData)) {
        throw new Error("The data must be of type 'Array'. (read for showAppointmentPopup)");
      }

      popupData.forEach((data) => {
        if (!data.id) {
          throw new Error("It was detected that the 'id' value was not entered for the popup data. (read for showAppointmentPopup)");
        }

        if (typeof data.id !== 'number') {
          throw new Error("The 'id' value must be of type 'number'. (read for showAppointmentPopup)");
        }
      });

      setAppointmentPopup((prev) => ({
        ...prev,
        DISPLAY: true,
        CURRENT_DATA: popupData,
      }));

      return;
    }

    setAppointmentPopup((prev) => ({
      ...prev,
      DISPLAY: true,
      CURRENT_DATA: undefined,
    }));
  };

  // The currentData is cleared when the popup is closed.
  const closeAppointmentPopup = () => {
    setAppointmentPopup((prev) => ({
      ...prev,
      DISPLAY: false,
    }));

    setTimeout(() => {
      setAppointmentPopup((prev) => ({
        ...prev,
        CURRENT_DATA: undefined,
      }));
    }, 200);
  };

  // objects
  const socialMediaLinks = {
    FACEBOOK: 'https://www.facebook.com/atakenthastanesi',
    TWITTER: 'https://twitter.com/YalovaAtakent',
    INSTAGRAM: 'https://www.instagram.com/atakenthastanesi/',
    YOUTUBE: 'https://www.youtube.com/channel/UCxiifdHKXmXOLoh1ZapjX0A',
    WHATSAPP: 'https://api.whatsapp.com/send?phone=905433122079',
  };

  const layoutConfig = {
    CAMPAIGNS_POPUP: false,
    GO_TOP: true,
    WHATSAPP_LINK: {
      DISPLAY: false,
      HREF: socialMediaLinks.WHATSAPP,
    },
    MAKE_AN_APPOINTMENT_BUTTON: true,
    PRELOADER: true,
  };

  // useeffect
  useEffect(() => {
    // set languages
    setLanguages(() => (
      mockLanguages.map((item) => ({
        id: item.id,
        locale: item.locale,
        language: item.language,
        country: item.country,
        text: item.text,
      }))
    ));

    setCurrentLanguage(() => (
      mockLanguages.find((lang) => lang.language === localePath)
    ));

    // save current hospital appointment link
    if (hospitalSlug === 'orhangazi-atakent-cerrahi-tip-merkezi') {
      setAppointmentLink('http://randevu.meddata.com.tr/atakent-orhangazi/');
    } else if (hospitalSlug === 'gemlik-atakent-tip-merkezi') {
      setAppointmentLink('https://randevu.meddata.com.tr/atakent-gemlik/');
    } else {
      setAppointmentLink('https://atakent.kendineiyibak.app/');
    }
  }, [localePath]);

  // contect values
  const contextValues = useMemo(() => ({
    layoutConfig,
    socialMediaLinks,
    appointmentPopup,
    setAppointmentPopup,
    showAppointmentPopup,
    closeAppointmentPopup,
    languages,
    setLanguages,
    localePath,
    currentLanguage,
    defaultPathname,
    currentHospitalSlug: hospitalSlug,
    hospitalSlugUrl,
    appointmentLink,
  }), [layoutConfig, socialMediaLinks, localePath, currentLanguage, appointmentLink]);

  return (
    <GlobalContext.Provider
      value={contextValues}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
