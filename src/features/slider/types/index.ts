export interface SliderResponse {
  id: number;
  title: string;
  button_text: string;
  button_href: string;
  background_image_url: string;
  animation: string;
  element: string;
  hospital_id: number;
}

export interface SlidersResponse {
  items: SliderResponse[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
