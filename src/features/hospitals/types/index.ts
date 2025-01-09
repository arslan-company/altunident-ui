export interface HospitalDepartmentsResponse {
  items: Array<{
    id: number;
    hospital_id: number;
    department_id: number;
  }>;
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface HospitalResponse {
  id: number;
  name: string;
  short_name: string;
  slug: string;
  image_url: string;
  general_promotion_image_url: string;
  general_promotion_description: string;
  contact_address: string;
  contact_email: string;
  contact_phone: string;
  contact_google_maps_iframe: string;
  human_resources_email: string;
  appointment_link: string;
}

export interface HospitalsResponse {
  items: HospitalResponse[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
