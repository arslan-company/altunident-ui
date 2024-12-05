import regex from '@/constants/regex';

export default function isValidEmail(email) {
  return regex.email.test(email);
}
