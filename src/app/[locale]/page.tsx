'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('homepage.services')

  return (
    <div> {t('description')} </div>
  )
}
