import { z } from 'zod';
import regex from '@/constants/regex';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().regex(regex.phoneNumber, 'Geçerli bir telefon numarası giriniz'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır'),
  hospitalEmail: z.string().min(1, 'Hastane seçimi zorunludur'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
