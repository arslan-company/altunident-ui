import { endpoint } from '@/helpers/create-api';

import {
  CorporatePagesResponse,
  CorporatePageResponse,
  CorporateEventsBlogsResponse,
  CorporateEventsBlogResponse,
} from '../types';

export const corporateEndpoints = {
  getCorporatePages: endpoint.path('/corporate_pages/').get<
    never,
    {
      title?: string;
      sort_by?: string;
      sort_order?: string;
      language?: string;
      page?: number;
      size?: number;
    },
    CorporatePagesResponse
  >(),
  getCorporatePage: endpoint
    .path('/corporate_pages/:id')
    .get<{ id: string | number }, { language?: string }, CorporatePageResponse>(),
  getCorporateEventsBlogs: endpoint.path('/corporate_events_blog/').get<
    never,
    {
      title?: string;
      sort_by?: string;
      sort_order?: string;
      language?: string;
      page?: number;
      size?: number;
    },
    CorporateEventsBlogsResponse
  >(),
  getCorporateEventsBlog: endpoint
    .path('/corporate_events_blog/:id')
    .get<{ id: string | number }, { language?: string }, CorporateEventsBlogResponse>(),
} as const;
