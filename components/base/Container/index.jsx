import { createElement } from '@tiger-ui/react';

const Container = createElement('div')({
  style: ({ theme: { breakpoints } }) => ({
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: '2rem',
    paddingLeft: '2rem',

    [breakpoints.mqMin('sm')]: {
      maxWidth: '540px',
    },
    [breakpoints.mqMin('md')]: {
      maxWidth: '800px',
    },
    [breakpoints.mqMin('lg')]: {
      maxWidth: '960px',
    },
    [breakpoints.mqMin('xl')]: {
      maxWidth: '1140px',
    },
    [breakpoints.mqMin('xxl')]: {
      maxWidth: '1320px',
    },
  }),
});

export default Container;
