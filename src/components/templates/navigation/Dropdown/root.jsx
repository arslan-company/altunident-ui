import Link from 'next/link';
import { createElement } from '@tiger-ui/react';

export const DropdownContainer = createElement('div')({
  style: ({ theme: { transitions } }) => ({
    backgroundColor: '#fff',
    transition: `all ${transitions.duration.mid} ${transitions.easing.ease}`,
    position: 'absolute',
    minWidth: '150px',
    top: '115%',
    opacity: 0,
    visibility: 'hidden',
    zIndex: 2,
  }),
  props: {
    open: (value) => ({
      opacity: value ? 1 : 0,
      visibility: value ? 'visible' : 'hidden',
      top: value ? '100%' : '115%',
    }),
  },
});

export const DropdownLinkItem = createElement(Link)({
  style: ({ theme: { colors, transitions, typography } }) => ({
    color: `${colors.common.black} !important`,
    display: 'inline-block',
    width: '100%',
    whiteSpace: 'nowrap',
    padding: '0.7rem 1rem !important',
    transition: `all ${transitions.duration.mid} ${transitions.easing.ease} !important`,
    borderBottom: `solid 1px ${colors.grey[200]}`,
    margin: '0 !important',
    fontSize: `${typography.paragraph.fontSize} !important`,
    ':hover': {
      color: `${colors.base.primary.main} !important`,
      backgroundColor: colors.grey[100],
    },
  }),
});
