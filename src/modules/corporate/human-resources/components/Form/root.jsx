import { createElement } from '@tiger-ui/react';
import { FiDownload } from 'react-icons/fi';

// eslint-disable-next-line import/prefer-default-export
export const DownloadButton = createElement('a')({
  style: ({ theme: { colors, radius, typography } }) => ({
    fontSize: typography.paragraph.fontSize,
    display: 'inline-block',
    color: colors.base.primary.main,
    borderRadius: radius.values.sm,
    backgroundColor: 'transparent',
    ':hover': {
      color: colors.base.primary.dark,
    },
  }),
  Children: ({ children }) => (
    <>
      <FiDownload style={{ marginRight: '.5rem' }} />
      {children}
    </>
  ),
  defaults: {
    element: {
      href: '/files/is-basvuru-formu.docx',
      download: 'is-basvuru-formu',
    },
  },
});
