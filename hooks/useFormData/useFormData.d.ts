export declare function useFormData<FormData>(formData: FormData): {
    form: FormData;
    setForm: (form: FormData) => void;
    updateForm: (field: keyof FormData, value: any) => void;
}