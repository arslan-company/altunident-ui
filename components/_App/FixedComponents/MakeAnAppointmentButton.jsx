import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import Button from '@/components/base/Button';
import Box from '@/components/base/Box';
import AppointmentDialog from '@/components/templates/feedback/AppointmentDialog';

function MakeAnAppointmentButton() {
  const { t } = useTranslation('common');
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);

  return (
    <>
      <Box>
        <Button
          size="medium"
          onClick={() => setAppointmentDialogOpen(true)}
        >
          {t('navbar.make_an_appointment')}
        </Button>
      </Box>

      <AppointmentDialog
        open={appointmentDialogOpen}
        onClose={() => setAppointmentDialogOpen(false)}
      />
    </>
  );
}

export default MakeAnAppointmentButton;
