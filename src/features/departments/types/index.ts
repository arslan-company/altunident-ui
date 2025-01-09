export interface DepartmentResponse {
  id: number;
  name: string;
  content: string;
  image_url: string;
  description: string;
  pinned_blog_id: number;
  order_weight: number;
}

export interface DepartmentsResponse {
  items: DepartmentResponse[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
