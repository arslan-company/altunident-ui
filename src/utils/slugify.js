export default function slugify(text) {
  let str = text;

  str = str.toLowerCase();
  str = str.replace(/ğ/g, 'g');
  str = str.replace(/ü/g, 'u');
  str = str.replace(/ş/g, 's');
  str = str.replace(/ı/g, 'i');
  str = str.replace(/ö/g, 'o');
  str = str.replace(/ç/g, 'c');
  str = str.replace(/\s+/g, '-');
  str = str.replace(/[^a-z0-9-]/g, '');
  return str;
}
