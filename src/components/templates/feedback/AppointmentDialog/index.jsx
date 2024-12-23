import { useTranslation } from 'next-i18next';

import appointmentLinks from '@/constants/appointmentLinks';

import Dialog from '../Dialog';
import { AppointmentDialogContent, AppointmentDialogContentItem } from './root';

const appointmentLinksHospitalIds = appointmentLinks.map((item) => item.hospitalId);

/**
 * @param {{
 * hospitalIds: number[];
 * } & React.ComponentProps<typeof Dialog>} props
*/
export default function AppointmentDialog({
  hospitalIds = appointmentLinksHospitalIds,
  ...props
}) {
  const { t } = useTranslation('common');

  const appointmentItems = appointmentLinks.filter((item) => hospitalIds.includes(item.hospitalId));

  return (
    <Dialog
      title={t('appointment_popup.title')}
      {...props}
    >
      <AppointmentDialogContent>
        {appointmentItems.map((item) => (
          <AppointmentDialogContentItem href={item.link} key={item.id}>
            {item.hospitalName}
          </AppointmentDialogContentItem>
        ))}
      </AppointmentDialogContent>
    </Dialog>
  );
}
