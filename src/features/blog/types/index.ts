export interface BlogResponse {
  id: number;
  title: string;
  slug: string;
  author: string;
  cover_image_url: string;
  date: string;
  content: string;
}

export interface BlogsResponse {
  items: BlogResponse[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
