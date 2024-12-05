import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

import socialMediaLinks from '@/constants/socialMediaLinks';

import Button from '@/components/base/Button';
import Box from '@/components/base/Box';

import Dialog from '@/components/templates/feedback/Dialog';
import AppointmentDialog from '@/components/templates/feedback/AppointmentDialog';

import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';
import useHospitalRoutes from '@/hooks/useHospitalRoutes';
// import { useLastUpdate } from '@/hooks/fetch/useLastUpdate';

import dateHelper from '@/utils/dateHelper';

import SingleWidget from './SingleWidget';

function Footer() {
  const { currentHospitalSlugUrl } = useHospitalRoutes();
  const { currentHospitalData } = useGlobalHospitalData();
  const [suggestionDialogOpen, setSuggestionDialogOpen] = useState(false);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);

  const { t } = useTranslation('common');

  // const lastUpdateResponse = useLastUpdate({});

  // const getLastUpdateDate = () => {
  //   const lastUpdateDate = lastUpdateResponse.data?.last_update;

  //   if (lastUpdateDate) {
  //     const [dateData] = lastUpdateDate.split(' ');
  //     const [year, mount, day] = dateData.split('-');

  //     const date = new Date(year, Number(mount) - 1, day);

  //     date.setDate(date.getDate() - 1);

  //     const newYear = date.getFullYear();
  //     const newMount = dateHelper.formatDateItemToBeValid(String(date.getMonth() + 1));
  //     const newDay = dateHelper.formatDateItemToBeValid(String(date.getDate()));

  //     return `${newDay}/${newMount}/${newYear}`;
  //   }

  //   return '';
  // };

  const getLastUpdateDate = () => {
    const date = new Date();

    const newYear = date.getFullYear();
    const newMount = dateHelper.formatDateItemToBeValid(String(date.getMonth() + 1));
    const newDay = dateHelper.formatDateItemToBeValid(String(date.getDate()));

    return `${newDay}/${newMount}/${newYear}`;
  };

  const lastUpdateDate = getLastUpdateDate();

  const currentYear = new Date().getFullYear();

  const {
    FACEBOOK,
    TWITTER,
    INSTAGRAM,
    YOUTUBE,
    WHATSAPP,
  } = socialMediaLinks;

  const hospital = currentHospitalData.data;

  const items = {
    quick_menu: [
      {
        id: 1,
        title: t('footer.section_2.items.item_1_text'),
        href: '/',
      },
      {
        id: 2,
        title: t('footer.section_2.items.item_2_text'),
        href: '/doctors/',
      },
      {
        id: 3,
        title: t('footer.section_2.items.item_3_text'),
        href: '/departments/',
      },
      {
        id: 4,
        title: t('footer.section_2.items.item_4_text'),
        href: '/corporate/',
      },
      {
        id: 5,
        title: t('footer.section_2.items.item_5_text'),
        href: '/blog/',
      },
      {
        id: 6,
        title: t('footer.section_2.items.item_6_text'),
        href: `${currentHospitalSlugUrl}/contact/`,
      },
      {
        id: 7,
        title: 'KVKK',
        href: '/kvkk-aydinlatma-metni/',
      },
      {
        id: 8,
        title: 'Çerez Politikası',
        href: '/cookie-policy-page/',
      },
      {
        id: 9,
        title: 'Bu Test Nerede Yapılıyor?',
        href: 'https://ckysweb.saglik.gov.tr/labtestlerapp/testlabara.aspx',
      },
    ],
    patient_guide: [
      {
        id: 1,
        title: t('footer.section_3.items.item_1_text'),
        href: '/',
      },
      {
        id: 2,
        title: t('footer.section_3.items.item_2_text'),
        href: '/',
      },
      {
        id: 3,
        title: t('footer.section_3.items.item_3_text'),
        href: '/',
      },
      {
        id: 4,
        title: t('footer.section_3.items.item_4_text'),
        href: '/',
      },
      {
        id: 5,
        title: t('footer.section_3.items.item_5_text'),
        href: '/',
      },
      {
        id: 6,
        title: t('footer.section_3.items.item_6_text'),
        href: '/',
      },
      {
        id: 7,
        title: t('footer.section_3.items.item_7_text'),
        href: '/',
      },
      {
        id: 8,
        title: t('footer.section_3.items.item_8_text'),
        href: '/',
      },
    ],
  };

  return (
    <>
      <Dialog
        open={suggestionDialogOpen}
        onClose={() => setSuggestionDialogOpen(false)}
        title="Görüş ve Öneri Bildir"
        cssx={{
          maxWidth: '500px',
        }}
      >
        <Box p="1rem">
          <Box mb="2rem">
            Hasta İlişkileri Bölümü olarak; hastanelerimizden arzu ettiğiniz hizmeti almak ve
            sizlerin memnuniyetini sağlamak için; hastanemizden hizmet alan tüm hasta ve
            yakınlarının hastanemiz ile ilgili görüş ve düşüncelerini alır. Bildirilen tüm
            görüşleri ilgili departman yöneticileri ile değerlendirir ve sizlerin talepleri
            doğrultusunda hizmet kalitemizi artırmak için çalışır, değerlendirme sonrası alınan
            kararlar ve sonuçlar hakkında bölüme bildirimi yapan hastamıza geri dönüş yaparız.

            Hasta İlişkileri Bölümü, sizlerin memnuniyetine katkı sağladığı kadar, sizlerin de öneri
            ve görüşleriniz ile hastanemizin gelişimine katkı sağlar. Görüş , öneri ve
            şikayetleriniz sadece Hasta İlişkileri Bölümümüz değil ilgili tüm üst düzey
            yöneticilerimiz çözüm amaçlı ilgilenir.

            Hasta İlişkileri Bölümüne görüş, öneri veya düşünceleriniz bildirmek için:

            Görüşlerinizi internet aracılığıyla bildirmek için web sayfamızda yer alan
            &quot;Görüş ve Öneri&quot; bölümünden gönderebilirsiniz. Ayrıca, posta adresimize mektup
            gönderebilir, katlarda ve bekleme salonlarında bulunan anket formlarını doldurabilir,
            Hasta İlişkileri Bölümü yetkilileri ile yüz yüze görüşme talep edebilir ya da telefon
            ile görüşme yapabilirsiniz
          </Box>

          <Button as={Link} href={`${currentHospitalSlugUrl}/contact/#contact-form`}>İletişime Geç</Button>
        </Box>
      </Dialog>

      <AppointmentDialog
        open={appointmentDialogOpen}
        onClose={() => setAppointmentDialogOpen(false)}
      />

      <div className="footer-area">
        <footer className="footer-top-area pt-100 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <div
                  className="single-widget"
                  data-aos="fade-in"
                  data-aos-delay="100"
                  data-aos-duration="1200"
                >
                  <Link href="/">
                    <Image
                      src="/img/logo-atakent.svg"
                      alt="atakent hastanesi logo"
                      width={180}
                      height={100}
                      quality={70}
                    />
                  </Link>

                  <div className="call-center-area d-flex align-items-center">
                    <Image
                      src="/icons/call-center-icon.png"
                      alt="call-center"
                      width={80}
                      height={80}
                      quality={70}
                    />
                    <span className="text-white h5">444 16 77</span>
                  </div>

                  <p>{t('footer.section_1.description')}</p>

                  <div className="social-area mb-3">
                    <ul>
                      <li>
                        <a href={FACEBOOK} target="_blank" rel="noreferrer">
                          <i className="bx bxl-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href={TWITTER} target="_blank" rel="noreferrer">
                          <i className="bx bxl-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                          <i className="bx bxl-instagram" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={YOUTUBE}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="bx bxl-youtube" />
                        </a>
                      </li>
                      <li>
                        <a href={WHATSAPP} target="_blank" rel="noreferrer">
                          <i className="bx bxl-whatsapp" />
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="button-area">
                    <Button onClick={() => setAppointmentDialogOpen(true)} size="small" cssx={{ marginBottom: '1.2rem' }}>
                      {t('footer.section_1.make_an_appointment_button_text')}
                    </Button>

                    <Button onClick={() => setSuggestionDialogOpen(true)} href={`${currentHospitalSlugUrl}/contact/#contact-form`} size="small">
                      {t('footer.section_1.report_suggestion_button_text')}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-12">
                <SingleWidget items={items.quick_menu} title={t('footer.section_2.title')} />
              </div>

              <div className="col-lg-4 col-md-12">
                <div
                  className="single-widget contact"
                  data-aos="fade-in"
                  data-aos-delay="400"
                  data-aos-duration="1200"
                >
                  <h3>
                    {t('footer.section_4.title')}
                    {' '}
                    <span>{hospital?.name ? `/ ${hospital?.name}` : `/ ${t('footer.section_4.general_center_title')}`}</span>
                  </h3>
                  <ul>
                    <li>
                      <a href="tel:4441677">
                        <i className="bx bx-phone-call" />
                        <span>
                          {t('footer.section_4.items.support_line_title')}
                          :
                        </span>
                        444 16 77
                      </a>
                    </li>
                    <li>
                      <a href={hospital?.contact_email ? `mailto:${hospital?.contact_email}` : 'mailto:info@atakent.com'}>
                        <i className="bx bx-envelope" />
                        <span>
                          {t('footer.section_4.items.email_title')}
                          :
                        </span>
                        {hospital?.contact_email || 'info@atakent.com'}
                      </a>
                    </li>
                    <li>
                      <i className="bx bx-location-plus" />
                      <span>
                        {t('footer.section_4.items.address_title')}
                        :
                      </span>
                      {hospital?.contact_address || t('footer.section_4.items.address_text')}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-12 text-white">
                {t('footer.last_update_date')}
                :
                {' '}
                {lastUpdateDate}
              </div>
            </div>
          </div>
        </footer>

        <div className="footer-bottom-area">
          <div className="container">
            <div className="copy-right">
              <p>
                Copyright &copy; 2008 -
                {' '}
                {currentYear}
                {' '}
                | Powered by
                {' '}
                <a href="https://arslansoftwareservices.com/" target="blank">
                  Arslan Software.
                </a>
                {' '}
                {t('footer.section_1.rights_reserved')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Footer;
