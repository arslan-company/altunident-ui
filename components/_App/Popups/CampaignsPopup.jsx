import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import Button from '@/components/base/Button';

import InlineSVG from '../../../utils/InlineSVG';

function CampaignsPopup() {
  const { t } = useTranslation('common');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 3000);
  }, []);

  const campaignItems = [
    {
      id: 1,
      title: 'Kampanya 1',
      end_date: '20 May 2024',
    },
    {
      id: 2,
      title: 'Kampanya 2',
      end_date: '20 May 2024',
    },
    {
      id: 3,
      title: 'Kampanya 3',
      end_date: '20 May 2024',
    },
    {
      id: 4,
      title: 'Kampanya 4',
      end_date: '20 May 2024',
    },
    {
      id: 5,
      title: 'Kampanya 5',
      end_date: '20 May 2024',
    },
    {
      id: 6,
      title: 'Kampanya 6',
      end_date: '20 May 2024',
    },
    {
      id: 7,
      title: 'Kampanya 7',
      end_date: '20 May 2024',
    },
  ];

  return (
    <div className={`campaigns-popup-wrapper ${showPopup ? 'show' : 'close'}`}>
      <div className="campaigns-popup-head">
        <div className="title-area">
          <h3 className="title">
            <InlineSVG className="title-icon" path="/icons/campaign.svg" />
            {t('campaign.title')}
          </h3>
          <p className="sub-title">{t('campaign.sub_title')}</p>
        </div>
        <Button onClick={() => setShowPopup(false)}>
          Close
        </Button>
      </div>
      <div className="campaigns-popup-body">
        <div className="items">
          {campaignItems.map((item) => (
            <div key={item.id} className="item">
              <h4 className="item-title">{item.title}</h4>
              <p className="item-date">
                <span>{t('campaign.end_date')}</span>
                {item.end_date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CampaignsPopup;
