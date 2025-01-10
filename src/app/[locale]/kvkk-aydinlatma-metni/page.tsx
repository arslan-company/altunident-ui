import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';

import generateMeta from '@/utils/generate-meta';

export default async function KVKKPage() {
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title="Kişisel Verilerin Korunması (KVKK)"
        items={[
          { label: t('site.name'), href: '/' },
          { label: 'Kişisel Verilerin Korunması (KVKK)' },
        ]}
      />
      <main className="tw-min-h-screen tw-py-12">
        <div className="container tw-mx-auto tw-px-4 tw-space-y-6">
          <h3>KVKK (Kişisel Verilerin Korunması Konunu)</h3>
          <div className="tw-space-y-8">
            <section>
              <h4 className="tw-text-xl tw-font-semibold tw-mb-4">1. Veri Sorumlusu</h4>
              <div className="tw-space-y-2">
                <p>Altunident Diş Kliniği</p>
                <p>Adres: Altunizade, Mahir İz Cd. No:43, Üsküdar/İstanbul</p>
                <p>Telefon: 444 8 000</p>
                <p>E-posta: info@altunident.com</p>
              </div>
            </section>

            <section>
              <h4 className="tw-text-xl tw-font-semibold tw-mb-4">
                2. Kişisel Verilerin İşlenme Amaçları
              </h4>
              <p>
                Altunident Diş Kliniği olarak, müşteri memnuniyetini sağlamak ve hizmet kalitemizi
                artırmak amacıyla aşağıdaki amaçlarla kişisel verilerinizi işlemekteyiz:
              </p>
              <ul className="tw-list-disc tw-pl-6 tw-mt-2 tw-space-y-1">
                <li>Hizmetlerimizi sunmak ve geliştirmek</li>
                <li>Randevu taleplerini işlemek</li>
                <li>İletişim taleplerini yanıtlamak</li>
                <li>Sağlık hizmetleri sunumu için gerekli olan bilgileri sağlamak</li>
                <li>Sağlık turizmi hizmetlerimizi sunmak ve organize etmek</li>
              </ul>
            </section>

            <section>
              <h4 className="tw-text-xl tw-font-semibold tw-mb-4">3. İşlenen Kişisel Veriler</h4>
              <p>
                Altunident Diş Kliniği olarak, aşağıdaki kişisel veri kategorilerini işlemekteyiz:
              </p>
              <ul className="tw-list-disc tw-pl-6 tw-mt-2 tw-space-y-1">
                <li>İletişim bilgileri (ad, soyad, e-posta adresi, telefon numarası vb.)</li>
                <li>Sağlık bilgileri</li>
                <li>Randevu talepleri ile ilgili bilgiler</li>
                <li>İnternet sitesi kullanımıyla ilgili veriler (çerezler, IP adresleri vb.)</li>
              </ul>
            </section>

            <section>
              <h4 className="tw-text-xl tw-font-semibold tw-mb-4">
                4. Kişisel Verilerin Saklama Süresi
              </h4>
              <p>
                Kişisel veriler, yasal saklama sürelerine ve işlenme amaçlarına uygun olarak
                saklanmaktadır. Veri sahipleri talep etmedikçe kişisel verilerinizi saklamayacağız.
              </p>
            </section>

            <section>
              <h4 className="tw-text-xl tw-font-semibold tw-mb-4">
                5. Kişisel Veri Sahibi Hakları
              </h4>
              <p>KVKK kapsamında, veri sahiplerine aşağıdaki hakları tanımaktayız:</p>
              <ul className="tw-list-disc tw-pl-6 tw-mt-2 tw-space-y-1">
                <li>Kişisel veri işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme</li>
                <li>
                  Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp
                  kullanılmadığını öğrenme
                </li>
                <li>
                  Kişisel verilerin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme
                </li>
                <li>
                  Kişisel verilerin eksik veya yanlış işlenmiş olması halinde bunların
                  düzeltilmesini isteme
                </li>
                <li>
                  KVKK ve ilgili diğer mevzuat hükümlerine uygun olarak kişisel verilerin
                  silinmesini veya yok edilmesini talep etme
                </li>
                <li>
                  Kişisel verilerin aktarıldığı üçüncü kişilere bu taleplerin bildirilmesini isteme
                </li>
                <li>
                  İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi
                  suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme
                </li>
                <li>
                  Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması halinde
                  zararın giderilmesini talep etme
                </li>
              </ul>
            </section>

            <section>
              <h4 className="tw-text-xl tw-font-semibold tw-mb-4">6. Başvuru Yöntemi</h4>
              <p>
                KVKK kapsamında veri sahipleri yukarıdaki haklarını kullanmak için Altunident Diş
                Kliniği ile iletişime geçebilirler. Başvurularınızı, yazılı olarak veya
                KVKK&apos;nın belirlediği diğer yöntemlerle yapabilirsiniz.
              </p>
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
      title: `Kişisel Verilerin Korunması (KVKK) | ${hospitalName}`,
      description: `Kişisel Verilerin Korunması (KVKK) | ${hospitalName}`,
      keywords: `Kişisel Verilerin Korunması (KVKK) | ${hospitalName}`,
      openGraph: {
        title: `Kişisel Verilerin Korunması (KVKK) | ${hospitalName}`,
        description: `Kişisel Verilerin Korunması (KVKK) | ${hospitalName}`,
        images: [
          {
            url: '/img/og-images/og-image.png',
            width: 1200,
            height: 630,
            alt: `Kişisel Verilerin Korunması (KVKK) | ${hospitalName}`,
          },
        ],
      },
      twitter: {
        title: `Kişisel Verilerin Korunması (KVKK) | ${hospitalName}`,
        description: `Kişisel Verilerin Korunması (KVKK) | ${hospitalName}`,
        images: ['/img/og-images/og-image.png'],
      },
    },
    {
      path: '/kvkk',
    },
  );
}
