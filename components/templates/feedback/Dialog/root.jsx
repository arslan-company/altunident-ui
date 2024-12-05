import { Element, createElement } from '@tiger-ui/react';

export const DialogContainer = createElement('dialog')({
  style: ({ theme: { colors, radius } }) => ({
    minWidth: '200px',
    overflow: 'hidden',
    borderRadius: `${radius.values.lg}`,
    backgroundColor: colors.common.white,
    padding: 0,
    border: 'none',
    margin: 0,
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 0,
    visibility: 'hidden',

    '::backdrop': {
      backgroundColor: 'rgba(0,0,0,.4)',
      backdropFilter: 'blur(12px)',
    },

    '&[open]': {
      visibility: 'visible',
    },
  }),
});

export const DialogHeader = createElement('div')({
  style: ({ theme: { colors } }) => ({
    padding: '0.5rem 0.75rem',
    paddingLeft: '1rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    backgroundColor: colors.base.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  extendedProps: [Element.Flexbox.props],
});

export const DialogBody = createElement('div')({
  style: {},
});
