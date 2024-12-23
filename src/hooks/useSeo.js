import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function useSeo() {
  const { i18n } = useTranslation('common');
  const router = useRouter();
  const { pathname } = router;

  const url = `https://atakent.com${pathname}`;
  const locale = `${i18n.language}_${i18n.language?.toUpperCase()}`;

  return {
    pathname,
    locale,
    url,
  };
}
