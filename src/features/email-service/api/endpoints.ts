import { endpoint } from '@/helpers/create-api';

export const emailServiceEndpoints = {
  sendEmail: endpoint
    .path('/reach-us')
    .post<
      never,
      never,
      { name: string; target: string; email: string; phone: string; message: string },
      { message: string }
    >(),
  sendCv: endpoint.path('/send-cv').post<
    never,
    {
      name: string;
      target: string;
      department: string;
      hospital: string;
      email: string;
      phone_number: string;
    },
    FormData,
    { message: string }
  >({ headers: { 'Content-Type': 'multipart/form-data' } }),
} as const;
