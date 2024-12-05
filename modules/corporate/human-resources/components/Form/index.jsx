import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Swal from 'sweetalert2';

import Box from '@/components/base/Box';
import Button from '@/components/base/Button';

import { sendCv } from '@/api/email';

import regex from '@/constants/regex';

import isValidEmail from '@/utils/isValidEmail';

import useFormData from '@/hooks/useFormData';
import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';
import useDom from '@/hooks/useDom';

import { DownloadButton } from './root';

function Form() {
  const { t } = useTranslation('common');
  const { hospitalsData } = useGlobalHospitalData();
  const { domLoaded } = useDom();

  const [cvFile, setCvFile] = useState(undefined);

  const { form, setForm, updateForm } = useFormData({
    name: '',
    hospitalName: '',
    department: '',
    phone: '',
    email: '',
    hospitalEmail: '',
  });

  const hospitals = hospitalsData.data?.items || [];

  const departments = [
    { id: 1, name: 'Hemşirelik Hizmetleri' },
    { id: 2, name: 'Hasta Hizmetleri' },
    { id: 3, name: 'Laboratuvar' },
    { id: 4, name: 'Radyoloji' },
    { id: 5, name: 'İdari Birim' },
    { id: 6, name: 'Engelli' },
  ];

  const handleSelectedHospital = (event) => {
    const hospitalId = event.target.value;
    const selectedHospital = hospitals.find((hospital) => String(hospital.id) === hospitalId);

    updateForm('hospitalName', selectedHospital?.name);
    updateForm('hospitalEmail', selectedHospital?.human_resources_email);
  };

  const handleSelectedDepartment = (event) => {
    const departmentName = event.target.value;

    updateForm('department', departmentName);
  };

  const handleSendCv = async () => {
    // file verification
    if (cvFile) {
      try {
        const data = {
          name: form.name,
          hospital: form.hospitalName,
          department: form.department,
          phone_number: form.phone,
          target: form.hospitalEmail,
          email: form.email,
        };

        await sendCv(data, cvFile);

        Swal.fire({
          title: t('cv_form_page.cv_form.alerts.success'),
          icon: 'success',
        });

        setForm({
          name: '',
          hospitalName: '',
          phone: '',
          email: '',
          hospitalEmail: '',
        });
      } catch (error) {
        if (error.response.request.responseText.includes('You can send cv only once per 15 minutes')) {
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
      }
    } else {
      Swal.fire({
        title: t('cv_form_page.cv_form.alerts.upload_cv_file'),
        icon: 'info',
      });
    }
  };

  const handlePhoneNumber = (event) => {
    const inputValue = event.target.value;

    if (regex.phoneNumber.test(inputValue)) {
      updateForm('phone', inputValue);
    }
  };

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileNameParts = file.name.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

      if (fileExtension === 'docx') {
        try {
          setCvFile(file);
        } catch {
          // eslint-disable-next-line no-alert
          Swal.fire({
            title: 'Dosya yüklenirken bir sorun oluştu.',
            icon: 'error',
          });
          setCvFile(undefined);
        }
      } else {
        // eslint-disable-next-line no-alert
        Swal.fire({
          title: 'Yüklemeye çalıştığınız dosya türü desteklenmemektedir.',
          icon: 'error',
        });
        setCvFile(undefined);
      }
    }
  };

  const handleRequired = () => {
    switch (true) {
      case !form.name:
        return true;
      case !form.hospitalName:
        return true;
      case !form.department:
        return true;
      case form.phone.length !== 11:
        return true;
      case !isValidEmail(form.email):
        return true;
      case !cvFile:
        return true;
      default:
        return false;
    }
  };

  if (!domLoaded) return null;

  return (
    <div className="cv-form">
      <span className="top-title">{t('cv_form_page.cv_form.top_title')}</span>
      <h2>{t('cv_form_page.cv_form.title')}</h2>

      <form onSubmit={(e) => {
        e.preventDefault();
        handleSendCv();
      }}
      >
        <div className="row">
          <div className="col-12">
            <Box mb="2rem">
              <Box mb="1rem">
                {t('cv_form_page.cv_form.description')}
              </Box>
              <DownloadButton>{t('cv_form_page.cv_form.download_form_button_title')}</DownloadButton>
            </Box>
          </div>

          <div className="col-lg-6">
            <label>{t('cv_form_page.cv_form.form.fullname_label_text')}</label>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="Name"
                placeholder={t('cv_form_page.cv_form.form.fullname_placeholder_text')}
                value={form.name}
                onChange={(e) => updateForm('name', e.target.value)}
                required
              />
              <i className="flaticon-account" />
            </div>
          </div>

          <div className="col-lg-6">
            <label>{t('cv_form_page.cv_form.form.phone_label_text')}</label>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="Name"
                placeholder={`${t('cv_form_page.cv_form.form.phone_placeholder_text')} (0555 555 55 55)`}
                value={form.phone}
                onChange={handlePhoneNumber}
                required
              />
              <i className="flaticon-account" />
            </div>
          </div>

          <div className="col-lg-6">
            <label>{t('cv_form_page.cv_form.form.email_label_text')}</label>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="Name"
                placeholder={t('cv_form_page.cv_form.form.email_placeholder_text')}
                value={form.email}
                onChange={(e) => updateForm('email', e.target.value)}
                required
              />
              <i className="flaticon-account" />
            </div>
          </div>

          <div className="col-lg-6">
            <label>{t('cv_form_page.cv_form.form.hospitals_placeholder_text')}</label>
            <div className="form-group">
              <select className="form-control" onChange={handleSelectedHospital} required>
                <option value="">{t('cv_form_page.cv_form.form.hospitals_default_option_text')}</option>
                {hospitals?.map((option) => (
                  <option key={option?.id} value={option?.id}>{option?.name}</option>
                ))}
              </select>
              <i className="flaticon-heart" />
            </div>
          </div>

          <div className="col-lg-12">
            <label>{t('cv_form_page.cv_form.form.departments_placeholder_text')}</label>
            <div className="form-group">
              <select className="form-control" onChange={handleSelectedDepartment} required>
                <option value="">{t('cv_form_page.cv_form.form.departments_default_option_text')}</option>
                {departments?.map((option) => (
                  <option key={option?.id} value={option?.name}>{option?.name}</option>
                ))}
              </select>
              <i className="flaticon-heart" />
            </div>
          </div>

          <div className="col-lg-6">
            <label>{t('cv_form_page.cv_form.form.upload_cv_label')}</label>
            <div className="form-group">
              <input type="file" accept=".docx" onChange={handleUploadFile} />
            </div>
          </div>

          <div className="col-12">
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              {handleRequired() && (
                <Box mr="1.4rem" fontSize="13px" opacity="0.7">
                  Tüm alanları doğru bir şekilde doldurunuz.
                </Box>
              )}

              <Button type="submit" disabled={handleRequired()}>
                {t('doctor_detail_page.make_an_appointment_area.form.submit_button_text')}
              </Button>
            </Box>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
