import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';

import generateMeta from '@/utils/generate-meta';

export default async function CookiePolicyPage() {
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title="Çerez Politikası"
        items={[{ label: t('site.name'), href: '/' }, { label: 'Çerez Politikası' }]}
      />
      <main className="tw-min-h-screen tw-py-12">
        <div className="container tw-mx-auto tw-px-4 tw-space-y-6">
          <h2>Çerez Politikası</h2>
          <p>Son güncellenme: 15/05/2024</p>
          <div className="tw-space-y-8">
            <section>
              <h3 className="tw-text-2xl tw-font-bold tw-mb-4">Çerez Politikası</h3>
              <p className="tw-text-gray-600">
                Bu çerez politikası, Altunident Diş Kliniği web sitesi (&quot;sitemiz&quot;)
                üzerinden toplanan çerezlerle ilgili bilgi sağlamak amacıyla hazırlanmıştır. Bu
                politika, çerezlerin nasıl kullanıldığını, hangi tür çerezlerin kullanıldığını ve
                çerezleri nasıl kontrol edebileceğinizi açıklamaktadır.
              </p>
            </section>

            <section>
              <h4 className="tw-text-xl tw-font-semibold tw-mb-4">1. Çerez Nedir?</h4>
              <p className="tw-text-gray-600">
                Çerezler, web sitesini ziyaret eden cihazda (bilgisayar, akıllı telefon, tablet vb.)
                saklanan küçük metin dosyalarıdır. Bu dosyalar, web sitesinin kullanımı sırasında
                bilgisayarınıza veya cihazınıza indirilir ve daha sonra web sitesi tarafından
                okunabilir. Çerezler, web sitesinin verimli çalışmasını sağlamak, kullanıcı
                deneyimini iyileştirmek ve web sitesinin sahiplerine belirli bilgiler sağlamak için
                kullanılır.
              </p>
            </section>

            <section>
              <h4 className="tw-text-xl tw-font-semibold tw-mb-4">
                2. Hangi Tür Çerezler Kullanıyoruz?
              </h4>
              <p className="tw-text-gray-600">
                Sitemizde aşağıdaki türde çerezler kullanılmaktadır:
              </p>
              <ul className="tw-list-disc tw-pl-6 tw-mt-4 tw-space-y-3">
                <li className="tw-text-gray-600">
                  <span className="tw-font-semibold">Zorunlu Çerezler:</span> Web sitesinin temel
                  işlevselliğini sağlamak için gereklidir. Bu çerezler, siteye giriş yapmanızı ve
                  güvenli alanlara erişmenizi sağlar.
                </li>
                <li className="tw-text-gray-600">
                  <span className="tw-font-semibold">Analitik ve Performans Çerezleri:</span> Siteyi
                  nasıl kullandığınızı anlamamıza yardımcı olmak için kullanılır. Bu çerezler, site
                  trafiğini izlememize, hangi sayfaların en çok ziyaret edildiğini ve hangi
                  bağlantıların en çok tıklandığını görmemize olanak tanır.
                </li>
                <li className="tw-text-gray-600">
                  <span className="tw-font-semibold">İşlevsellik Çerezleri:</span> Siteyi
                  ziyaretiniz sırasında tercihlerinizi hatırlamamıza olanak tanır. Örneğin, dil veya
                  bölge tercihlerinizi hatırlayabiliriz.
                </li>
              </ul>
            </section>

            <section>
              <h4 className="tw-text-xl tw-font-semibold tw-mb-4">
                3. Çerezleri Nasıl Kontrol Edebilirsiniz?
              </h4>
              <p className="tw-text-gray-600">
                Çoğu web tarayıcısı, çerezleri kabul etmek için bir seçenek sunar veya çerezleri
                reddetmek için bildirimde bulunur. Tarayıcınızın ayarlarını kullanarak çerezleri
                kontrol edebilir veya silebilirsiniz. Ancak, çerezleri devre dışı bırakmanın bazı
                web sitelerinin işlevselliğini etkileyebileceğini unutmayın.
              </p>
            </section>

            <section>
              <h4 className="tw-text-xl tw-font-semibold tw-mb-4">4. Değişiklikler</h4>
              <p className="tw-text-gray-600">
                Bu çerez politikası düzenli olarak gözden geçirilir ve güncellenir. Politikadaki
                değişiklikler burada yayınlanır ve değişiklikler yürürlüğe girdiği tarihte geçerli
                olur.
              </p>
            </section>

            <section>
              <h4 className="tw-text-xl tw-font-semibold tw-mb-4">5. İletişim</h4>
              <p className="tw-text-gray-600 tw-mb-4">
                Bu çerez politikası ile ilgili herhangi bir sorunuz veya endişeniz varsa, lütfen
                bize ulaşın:
              </p>
              <div className="tw-space-y-2">
                <p className="tw-text-gray-600">
                  Adres: Altunizade, Mahir İz Cd. No:43, Üsküdar/İstanbul
                </p>
                <p className="tw-text-gray-600">Telefon: 444 8 000</p>
                <p className="tw-text-gray-600">E-posta: info@altunident.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const tSite = await getTranslations('site');

  const hospitalName = tSite('name');

  return await generateMeta(
    {
      title: `Çerez Politikası | ${hospitalName}`,
      description: `Çerez Politikası | ${hospitalName}`,
      keywords: `Çerez Politikası | ${hospitalName}`,
      openGraph: {
        title: `Çerez Politikası | ${hospitalName}`,
        description: `Çerez Politikası | ${hospitalName}`,
        images: [
          {
            url: '/img/og-images/og-image.png',
            width: 1200,
            height: 630,
            alt: `Çerez Politikası | ${hospitalName}`,
          },
        ],
      },
      twitter: {
        title: `Çerez Politikası | ${hospitalName}`,
        description: `Çerez Politikası | ${hospitalName}`,
        images: ['/img/og-images/og-image.png'],
      },
    },
    {
      path: '/cookie-policy-page',
    },
  );
}
