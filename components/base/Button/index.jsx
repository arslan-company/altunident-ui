import { createElement } from '@tiger-ui/react';

const Button = createElement('button')({
  style: ({ theme: { colors, radius, transitions } }) => ({
    cursor: 'pointer',
    borderRadius: radius.values.sm,
    transition: `all ${transitions.duration.mid} ${transitions.easing.ease}`,
    textAlign: 'center',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.common.white,
    ':disabled': {
      opacity: '0.7',
      cursor: 'default',
    },
  }),
  props: {
    size: (value, { theme: { typography } }) => {
      if (value === 'iconOnly') {
        return {
          padding: '5px',
        };
      }

      if (value === 'xsmall') {
        return {
          padding: '4px 15px',
          fontSize: '12px',
        };
      }

      if (value === 'small') {
        return {
          padding: '6px 25px',
          fontSize: typography.paragraph.fontSize,
        };
      }

      // medium :
      return {
        padding: '6px 30px',
        fontSize: typography.h6.fontSize,
      };
    },
    variant: (value, { theme: { colors }, disabled }) => {
      if (value === 'text') {
        return {
          backgroundColor: 'transparent',
          color: colors.grey[200],
        };
      }

      // contained :
      return {
        backgroundColor: colors.base.primary.main,
        ...(disabled
          ? {}
          : {
            ':hover': {
              backgroundColor: colors.base.primary.dark,
              color: 'white',
            },
          }
        ),
      };
    },
    fullWidth: (value) => ({
      width: value ? '100%' : 'auto',
    }),
  },
  defaults: {
    custom: {
      size: 'medium',
      variant: 'contained',
      fullWidth: false,
    },
  },
});

export default Button;
