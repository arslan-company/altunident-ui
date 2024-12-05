import { useState } from 'react';
import { createElement, css, useTheme } from '@tiger-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Box from '@/components/base/Box';
import Button from '@/components/base/Button';

import useHospitalRoutes from '@/hooks/useHospitalRoutes';

import slugify from '@/utils/slugify';

import AppointmentDialog from '../../feedback/AppointmentDialog';

export const DoctorCardContainer = createElement('div')({
  style: ({ theme: { colors } }) => ({
    width: '247px',
    height: 'auto',
    backgroundColor: colors.base.primary.main,
  }),
});

export const DoctorCardTop = createElement('div')({
  Children: ({
    education,
    specializationTraining,
    languages,
    hospitals,
    image,
    showInformation = true,
  }) => {
    const { t } = useTranslation('common');
    const { typography, transitions } = useTheme();
    const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);

    return (
      <>
        <Box
          cssx={{
            position: 'relative',
            overflow: 'hidden',
            md: {
              '&:hover [data-value="doctor-detail"]': showInformation ? {
                opacity: 1,
                visibility: 'visible',
              } : {},
            },
          }}
        >
          <Box
            data-value="doctor-detail"
            background="linear-gradient(to top, rgba(0,0,0,.9), rgba(0,0,0,.4))"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="flex-start"
            px={2}
            py={1.5}
            cssx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              textAlign: 'left !important',
              zIndex: 1,
              opacity: 0,
              visibility: 'hidden',
              transition: `all ${transitions.duration.mid} ${transitions.easing.ease}`,
            }}
          >
            {education && (
              <Box mb={1}>
                <Box color="primary" fontSize={typography.h5.fontSize}>
                  {t('doctors_page.doctor_card.education_title')}
                </Box>
                <Box
                  cssx={{ lineHeight: 1.5 }}
                  color="white"
                >
                  {education}
                </Box>
              </Box>
            )}

            {specializationTraining && (
              <Box mb={1}>
                <Box color="primary" fontSize={typography.h5.fontSize}>
                  {t('doctors_page.doctor_card.specialization_training_title')}
                </Box>
                <Box
                  cssx={{ lineHeight: 1.5 }}
                  color="white"
                >
                  {specializationTraining}
                </Box>
              </Box>
            )}

            {languages && (
              <Box mb={1}>
                <Box color="primary" fontSize={typography.h5.fontSize}>{t('doctors_page.doctor_card.languages_title')}</Box>
                <Box
                  cssx={{ lineHeight: 1.5 }}
                  color="white"
                >
                  {languages}
                </Box>
              </Box>
            )}

            <Box>
              <Button
                size="small"
                onClick={() => {
                  setAppointmentDialogOpen(true);
                }}
              >
                {t('doctors_page.doctor_card.make_an_appointment_title')}
              </Button>
            </Box>
          </Box>
          <Box>
            {image && (
              <Image
                src={image}
                alt=""
                width={256}
                height={356}
                quality={80}
                className={css({
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  bottom: 0,
                })}
              />
            )}
            <Image
              src="/img/doctors/doctor-background.jpg"
              alt="atakent doctor background"
              width={432}
              height={600}
              quality={40}
              priority
              className={css({
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              })}
            />
          </Box>
        </Box>
        <Box
          color="white"
          py="0.3rem"
          px="0.5rem"
          display="flex"
        >
          {hospitals.length > 1
            ? hospitals.map((hospital) => (
              <Box
                key={hospital?.name}
                cssx={{
                  display: 'inline-block',
                  width: `${100 / hospitals.length}%`,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {hospital?.name}
              </Box>
            ))
            : (
              <Box
                cssx={{
                  display: 'inline-block',
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textAlign: 'center',
                }}
              >
                {hospitals.map((hospital) => hospital?.name).join('')}
              </Box>
            )}
        </Box>

        <AppointmentDialog
          open={appointmentDialogOpen}
          onClose={() => setAppointmentDialogOpen(false)}
          hospitalIds={hospitals.map((hospital) => hospital?.id)}
        />
      </>
    );
  },
});

export const DoctorCardBottom = createElement('div')({
  style: () => ({
    backgroundColor: 'white',
    boxShadow: '0 0 20px rgba(0,0,0,.1)',
    width: '100%',
  }),
  Children: ({ departmentName, name, id }) => {
    const { typography, colors, transitions } = useTheme();
    const { currentHospitalSlugUrl } = useHospitalRoutes();

    return (
      <Link
        className={css({
          padding: '1rem',
          '&:hover [data-value="doctor-name"]': {
            color: `${colors.base.primary.main} !important`,
          },
          display: 'block',
        })}
        href={`${currentHospitalSlugUrl}/doctors/${id}/${slugify(name)}`}
      >
        <Box
          fontSize={{
            xs: typography.h6.fontSize,
            md: typography.h5.fontSize,
          }}
          lineHeight={1.1}
          color="black"
          data-value="doctor-name"
          cssx={{
            display: 'inline-block',
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: `all ${transitions.duration.mid}`,
            textAlign: 'center',
          }}
        >
          {name}
        </Box>
        <Box
          color="primary"
          cssx={{
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center',
          }}
        >
          {departmentName}
        </Box>
      </Link>
    );
  },
});
