import { useRouter } from 'next/router';
import CorporateEventsBlogDetailView from './CorporateEventsBlogDetail.View';
import { useCorporateEventsBlog } from '@/hooks/fetch/useCorporateEventsBlog';
import { useFile } from '@/hooks/fetch/useFiles';
import isValidFileName from '@/utils/isValidFileName';

export default function CorporateEventsBlogDetailContainer() {
  const router = useRouter();
  const { query: { corporateEventsBlogId } } = router;

  const corporateEventsBlogResponse = useCorporateEventsBlog({
    params: {
      blogId: corporateEventsBlogId,
    },
    options: {
      enabled: !!corporateEventsBlogId,
    },
  });

  const imageResponse = useFile({
    params: {
      fileName: corporateEventsBlogResponse.data?.cover_image_url,
    },
    options: {
      enabled: !!corporateEventsBlogResponse.data?.cover_image_url
        && isValidFileName(corporateEventsBlogResponse.data?.cover_image_url, ['.png', '.jpg', 'jpeg']),
    },
  });

  return (
    <CorporateEventsBlogDetailView
      data={{
        corporateEventsBlogResponse,
        imageResponse,
      }}
    />
  );
}
