const formatDate = (date: string, locale?: string, options?: Intl.DateTimeFormatOptions) => {
  return new Date(date).toLocaleDateString(locale, options);
};

export default formatDate;
