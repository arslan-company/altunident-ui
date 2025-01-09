import { z } from 'zod';

export const humanResourcesFormSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  hospitalName: z.string().min(1, 'Hastane seçimi zorunludur'),
  department: z.string().min(1, 'Departman seçimi zorunludur'),
  phone: z.string().regex(/^[0-9]{11}$/, 'Geçerli bir telefon numarası giriniz'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  hospitalEmail: z.string(),
});

export type HumanResourcesFormData = z.infer<typeof humanResourcesFormSchema>;
