export interface CorporatePageResponse {
  id: number;
  title: string;
  slug: string;
  html_content: string;
  cover_image_url: string;
  order_weight: number;
}

export interface CorporatePagesResponse {
  items: CorporatePageResponse[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface CorporateEventsBlogResponse {
  id: number;
  title: string;
  slug: string;
  author: string;
  cover_image_url: string;
  hospital: string;
  date: string;
  content: string;
}

export interface CorporateEventsBlogsResponse {
  items: CorporateEventsBlogResponse[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
