import { useTranslation } from 'next-i18next';

function Loading({ className }) {
  const { t } = useTranslation('common');

  return (
    <div className={`${className} loading-wrapper`}>
      <div className="loading-animation" />
      <div className="loading-text">
        {t('common_loading_component.loading_text')}
      </div>
    </div>
  );
}

export default Loading;
