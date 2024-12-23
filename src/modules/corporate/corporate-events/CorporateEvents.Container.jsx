import { useCorporateEventsBlogs } from '@/hooks/fetch/useCorporateEventsBlog';
import CorporateEventsView from './CorporateEvents.View';

export default function CorporateEventsContainer() {
  const corporateEventsBlogsResponse = useCorporateEventsBlogs({});

  return (
    <CorporateEventsView
      data={{
        corporateEventsBlogsResponse,
      }}
    />
  );
}
