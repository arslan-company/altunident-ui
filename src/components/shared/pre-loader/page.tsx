import React from 'react';

function Preloader() {
  return (
    <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-white tw-z-[9999]">
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-8">
        <div className="tw-relative">
          <div className="tw-w-24 tw-h-24 tw-border-4 tw-border-solid tw-border-gray-100 tw-border-t-primary tw-rounded-full tw-animate-spin" />
          <div className="tw-absolute tw-inset-0 tw-w-24 tw-h-24 tw-border-4 tw-border-solid tw-border-transparent tw-border-r-primary/30 tw-rounded-full tw-animate-[spin_2s_linear_infinite_reverse]" />
        </div>
      </div>
    </div>
  );
}

export default Preloader;
