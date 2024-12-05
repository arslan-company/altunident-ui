import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export function useFormData(formData) {
  const [form, setForm] = useState(formData);

  const updateForm = (field, value) => {
    setForm((oldFormData) => ({
      ...oldFormData,
      [field]: value,
    }));
  };

  return {
    form,
    setForm,
    updateForm,
  };
}
