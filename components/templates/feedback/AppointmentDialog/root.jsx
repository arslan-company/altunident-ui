import { createElement } from '@tiger-ui/react';

export const AppointmentDialogContent = createElement('div')({
  style: {
    maxWidth: '400px',
    height: '250px',
    overflowY: 'scroll',
  },
});

export const AppointmentDialogContentItem = createElement('a')({
  style: ({ theme: { colors, typography } }) => ({
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,.1)',
    color: colors.base.primary.main,
    fontSize: typography.h6.fontSize,
    fontWeight: typography.h6.fontWeight,
    display: 'inline-block',
    padding: '0.5rem 1rem',
    ':hover': {
      backgroundColor: colors.grey[100],
    },
  }),
  defaults: {
    element: {
      target: '_blank',
      rel: 'noreferrer',
    },
  },
});
