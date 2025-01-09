'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { Download } from 'lucide-react';

import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';
import { Select } from '@/components/base/select';

import { useHospital } from '@/features/hospitals';

import {
  humanResourcesFormSchema,
  type HumanResourcesFormData,
} from '../schemas/human-resources-form.schema';

import { useEmailServiceMutation } from '../hooks';

const departments = [
  { id: 1, name: 'Hemşirelik Hizmetleri' },
  { id: 2, name: 'Hasta Hizmetleri' },
  { id: 3, name: 'Laboratuvar' },
  { id: 4, name: 'Radyoloji' },
  { id: 5, name: 'İdari Birim' },
  { id: 6, name: 'Engelli' },
] as const;

interface HumanResourcesFormProps {
  readonly hideImage?: boolean;
}

export function HumanResourcesForm({ hideImage = false }: HumanResourcesFormProps) {
  const t = useTranslations();
  const { hospitals } = useHospital();
  const { mutate: sendCv, isLoading: isSending } = useEmailServiceMutation('sendCv');

  const [cvFile, setCvFile] = useState<File>();
  const [selectedHospital, setSelectedHospital] = useState<string | null>('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HumanResourcesFormData>({
    resolver: zodResolver(humanResourcesFormSchema),
    defaultValues: {
      name: '',
      hospitalName: '',
      department: '',
      phone: '',
      email: '',
      hospitalEmail: '',
    },
  });

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension === 'docx') {
        setCvFile(file);
      } else {
        Swal.fire({
          title: 'Yüklemeye çalıştığınız dosya türü desteklenmemektedir.',
          icon: 'error',
        });
        setCvFile(undefined);
      }
    }
  };

  const onSubmit = async (data: HumanResourcesFormData) => {
    if (!cvFile) {
      Swal.fire({
        title: t('cv_form_page.cv_form.alerts.upload_cv_file'),
        icon: 'info',
      });
      return;
    }

    const formData = new FormData();
    formData.append('cv', cvFile);

    sendCv(
      {
        body: formData,
        query: {
          name: data.name,
          department: data.department,
          email: data.email,
          hospital: data.hospitalName,
          target: data.hospitalEmail,
          phone_number: data.phone,
        },
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: t('cv_form_page.cv_form.alerts.success'),
            icon: 'success',
          });

          reset();
          setCvFile(undefined);
          setSelectedHospital('');
        },
        onError: (error: any) => {
          if (
            error.response?.request?.responseText?.includes(
              'You can send cv only once per 15 minutes',
            )
          ) {
            Swal.fire({
              title: t('cv_form_page.cv_form.alerts.time_constraint'),
              icon: 'error',
            });
          } else {
            Swal.fire({
              title: t('cv_form_page.cv_form.alerts.send_cv_failed'),
              icon: 'error',
            });
          }
        },
      },
    );
  };

  return (
    <div className="tw-py-24">
      <div className="tw-container tw-mx-auto tw-px-4">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8">
          {!hideImage && (
            <div className="tw-relative tw-h-[400px] lg:tw-h-full">
              <Image
                src="/img/gallery/altunident.jpg"
                alt="İK Başvuru"
                quality={60}
                fill
                className="tw-object-cover tw-rounded-lg"
              />
            </div>
          )}
          <div className="tw-w-full">
            <div className="tw-space-y-6">
              <div>
                <span className="tw-text-primary-600 tw-text-sm tw-font-medium">
                  {t('cv_form_page.cv_form.top_title')}
                </span>
                <h2 className="tw-text-3xl tw-font-bold tw-mt-2">
                  {t('cv_form_page.cv_form.title')}
                </h2>
              </div>

              <div className="tw-mb-8">
                <p className="tw-mb-4">{t('cv_form_page.cv_form.description')}</p>
                <a href="/files/is-basvuru-formu.docx" download="is-basvuru-formu">
                  <Button variant="text" className="tw-text-primary !tw-p-0" size="sm">
                    <Download className="tw-mr-2" />
                    {t('cv_form_page.cv_form.download_form_button_title')}
                  </Button>
                </a>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="tw-space-y-4">
                <div className="tw-space-y-4">
                  <div>
                    <Input
                      type="text"
                      className="tw-w-full"
                      placeholder={t('cv_form_page.cv_form.form.fullname_placeholder_text')}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                    <div>
                      <Input
                        type="email"
                        className="tw-w-full"
                        placeholder={t('cv_form_page.cv_form.form.email_placeholder_text')}
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        type="tel"
                        className="tw-w-full"
                        placeholder="Tel (05554443322)"
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Select
                      options={[
                        {
                          value: '',
                          label: t('cv_form_page.cv_form.form.hospitals_default_option_text'),
                        },
                        ...(hospitals?.map((hospital) => ({
                          label: hospital?.name || '',
                          value: String(hospital?.id) || '',
                        })) || []),
                      ]}
                      placeholder={t('cv_form_page.cv_form.form.hospitals_placeholder_text')}
                      value={selectedHospital}
                      onChange={(value) => {
                        const hospital = hospitals.find((h) => String(h.id) === value);
                        setSelectedHospital(String(hospital?.id));
                        setValue('hospitalName', hospital?.name || '');
                        setValue('hospitalEmail', hospital?.human_resources_email || '');
                      }}
                    />
                    {errors.hospitalName && (
                      <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                        {errors.hospitalName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Select
                      options={[
                        {
                          value: '',
                          label: t('cv_form_page.cv_form.form.departments_default_option_text'),
                        },
                        ...departments.map((dept) => ({
                          label: dept.name,
                          value: dept.name,
                        })),
                      ]}
                      placeholder={t('cv_form_page.cv_form.form.departments_placeholder_text')}
                      value={watch('department')}
                      onChange={(value) => setValue('department', value)}
                    />
                    {errors.department && (
                      <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                        {errors.department.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="file"
                      accept=".docx"
                      onChange={handleUploadFile}
                      className="tw-file:mr-4 tw-file:py-2 tw-file:px-4 tw-file:rounded-full tw-file:border-0 tw-file:text-sm tw-file:font-semibold tw-file:bg-primary-600 tw-file:text-white hover:tw-file:bg-primary-700"
                    />
                    {!cvFile && (
                      <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                        {t('cv_form_page.cv_form.alerts.upload_cv_file')}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Button type="submit" disabled={isSending} className="tw-w-full md:tw-w-auto">
                    {t('cv_form_page.cv_form.form.submit_button_text')}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
