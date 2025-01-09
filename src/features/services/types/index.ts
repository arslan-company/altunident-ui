export interface ServiceResponse {
  id: number;
  name: string;
  content: string;
  image_url: string;
  description: string;
  order_weight: number;
}

export interface ServicesResponse {
  items: ServiceResponse[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
