'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { useParams } from 'next/navigation';

import { useHospital } from '@/features/hospitals';
import { useEmailServiceMutation } from '@/features/email-service';

import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';
import { Select } from '@/components/base/select';
import { Textarea } from '@/components/base/textarea';

import { contactFormSchema, type ContactFormData } from '../schemas/contact-form.schema';
import generalInfo from '@/constants/general-info';

interface ContactFormProps {
  readonly hideImage?: boolean;
}

export function ContactForm({ hideImage = false }: ContactFormProps) {
  const t = useTranslations();
  const { hospitalSlug } = useParams();
  const { hospitals, currentHospital } = useHospital();
  const { mutate: sendEmail, isLoading: isSending } = useEmailServiceMutation('sendEmail');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: '',
      hospitalEmail: currentHospital?.contact_email || generalInfo.contactEmail || '',
      message: '',
      name: '',
      phone: '',
    },
  });

  const hospitalOptions =
    hospitals?.map((hospital) => ({
      label: hospital?.name || '',
      value: hospital?.contact_email || '',
    })) || [];

  const onSubmit = async (data: ContactFormData) => {
    sendEmail(
      {
        body: {
          email: data.email,
          message: data.message,
          name: data.name,
          phone: data.phone,
          target: data.hospitalEmail,
        },
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: t('contact_form.form.success_alert'),
            icon: 'success',
          });
          reset();
        },
        onError: (error: any) => {
          if (error.request.responseText.includes('Message is too short')) {
            Swal.fire({
              title: t('contact_form.form.message_too_short_error'),
              icon: 'error',
            });
          } else if (error.request.responseText.includes('You can send email only once per')) {
            Swal.fire({
              title: t('contact_form.form.time_constraint_error'),
              icon: 'error',
            });
          } else {
            Swal.fire({
              title: t('contact_form.form.error_alert'),
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
                src="/img/gallery/1397_1.jpg"
                alt="Atakent Communication"
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
                  {t('common.contact_us')}
                </span>
                <h2 className="tw-text-3xl tw-font-bold tw-mt-2">
                  {t('common.we_are_here_for_you')}
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="tw-space-y-4">
                <div className="tw-space-y-4">
                  <div>
                    <Input
                      type="text"
                      className="tw-w-full"
                      placeholder={t('common.name')}
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
                        placeholder={t('common.email')}
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
                        placeholder={`${t('common.phone')} (5554443322)`}
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {!hospitalSlug && !generalInfo.contactEmail && (
                    <div>
                      <Select
                        options={[
                          {
                            value: '',
                            label: t('common.select_hospital'),
                          },
                          ...hospitalOptions,
                        ]}
                        placeholder={t('common.select_hospital')}
                        value={watch('hospitalEmail')}
                        onChange={(value) => setValue('hospitalEmail', value)}
                      />
                      {errors.hospitalEmail && (
                        <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                          {errors.hospitalEmail.message}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <Textarea
                      className="tw-w-full"
                      rows={5}
                      placeholder={t('common.message')}
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.message.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Button type="submit" disabled={isSending} className="tw-w-full md:tw-w-auto">
                    {t('common.send')}
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
