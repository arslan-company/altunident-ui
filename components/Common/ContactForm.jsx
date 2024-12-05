import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Swal from 'sweetalert2';

import regex from '@/constants/regex';

import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';
import { useFormData } from '@/hooks/useFormData/useFormData';
import useHospitalRoutes from '@/hooks/useHospitalRoutes';

import { sendEmail } from '@/api/email';
import Button from '../base/Button';
import isValidEmail from '@/utils/isValidEmail';
import Box from '../base/Box';

function ContactForm({ showImage }) {
  const { currentHospitalData, hospitalsData } = useGlobalHospitalData();
  const { isDefaultHospitalSlugSelected } = useHospitalRoutes();

  // form data
  const { form, setForm, updateForm } = useFormData({
    name: '',
    email: '',
    phone: '',
    message: '',
    hospitalEmail: '',
  });

  const [isSending, setIsSending] = useState(false);

  const { t } = useTranslation('common');

  const hospitals = hospitalsData.data?.items || [];
  const currentHospital = currentHospitalData.data;

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const data = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        target: currentHospital?.contact_email || form.hospitalEmail,
      };

      await sendEmail(data);
      Swal.fire({
        title: t('contact_form.form.success_alert'),
        icon: 'success',
      });
      resetForm();
    } catch (error) {
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
    } finally {
      setIsSending(false);
    }
  };

  const handlePhoneNumber = (event) => {
    const inputValue = event.target.value;

    if (regex.phoneNumber.test(inputValue)) {
      updateForm('phone', inputValue);
    }
  };

  const handleHospital = (event) => {
    const hospitalEmail = event.target.value;

    updateForm('hospitalEmail', hospitalEmail);
  };

  const handleRequired = () => {
    switch (true) {
      case !form.name:
        return true;
      case !form.hospitalEmail:
        return true;
      case !form.message:
        return true;
      case !isValidEmail(form.email):
        return true;
      case form.phone.length !== 11:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="contact-form ptb-100">
      <div className="container">
        <div className="row">
          <div className={showImage ? 'col-lg-6' : 'col-lg-12'}>
            <div className="form-area">
              <span className="top-title">{t('contact_form.top_title')}</span>
              <h2>{t('contact_form.title')}</h2>

              <form onSubmit={handleSubmitForm}>
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder={t('contact_form.form.name_area_placeholder_text')}
                        value={form.name}
                        onChange={(e) => updateForm('name', e.target.value)}
                        required
                      />
                      <i className="flaticon-account" />
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="Email"
                        placeholder={t('contact_form.form.email_area_placeholder_text')}
                        value={form.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        required
                      />
                      <i className="flaticon-email" />
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="Phone"
                        placeholder={`${t('contact_form.form.phone_area_placeholder_text')} (0555 555 55 55)`}
                        value={form.phone}
                        onChange={handlePhoneNumber}
                        required
                      />
                      <i className="flaticon-smartphone" />
                    </div>
                  </div>

                  {isDefaultHospitalSlugSelected && (
                    <div className="col-12 mb-3">
                      <select className="form-control" onChange={handleHospital} required>
                        <option value="">{t('contact_form.form.hospital_area_placeholder_text')}</option>
                        {hospitals.map((hospital) => (
                          <option
                            key={hospital?.id}
                            value={hospital?.contact_email}
                          >
                            {hospital.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        name="message"
                        className="form-control"
                        id="Message"
                        cols="30"
                        rows="5"
                        placeholder={t('contact_form.form.message_area_placeholder_text')}
                        value={form.message}
                        onChange={(e) => updateForm('message', e.target.value)}
                        required
                      />
                      <i className="flaticon-edit" />
                    </div>
                  </div>

                  <div className="col-12">
                    <Box display="flex" alignItems="center">
                      <Button
                        type="submit"
                        disabled={handleRequired() || isSending}
                      >
                        {t('contact_form.form.submit_button_text')}
                      </Button>

                      {handleRequired() && (
                        <Box as="p" ml="1.4rem" fontSize="13px" opacity="0.7">
                          Tüm alanları doğru bir şekilde doldurunuz.
                        </Box>
                      )}
                    </Box>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {showImage && (
            <div className="col-lg-6">
              <div className="appointment-bg">
                <Image
                  src="/img/appointment-bg4.jpg"
                  alt="Atakent Communication"
                  quality={60}
                  fill
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
