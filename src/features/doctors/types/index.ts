export interface DoctorYoutubeLinksResponse {
  items: Array<{
    id: number;
    link: string;
    doctor_id: number;
  }>;
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface DoctorWorkingHoursResponse {
  items: Array<{
    id: number;
    start_of_day: string;
    end_of_day: string;
    active: boolean;
    day_of_week: number;
    doctor_id: number;
  }>;
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface DoctorHospitalsResponse {
  items: Array<{
    id: number;
    hospital_id: number;
    doctor_id: number;
  }>;
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface DoctorResponse {
  id: number;
  name: string;
  description: string;
  image_url: string;
  education: string;
  specialization_training: string;
  languages: string;
  order_weight: number;
  department_id: number;
  hospital_id: number;
  doctor_hospitals: DoctorHospitalsResponse['items'];
}

export interface DoctorsResponse {
  items: DoctorResponse[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
