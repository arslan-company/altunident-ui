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
          <p>
            Biz Atakent Grup olarak, güvenliğinize önem veriyor ve bu Çerez Politikası ile siz
            sevgili ziyaretçilerimize web sitemizdeki çerez kullanımı hakkında bilgi vermeyi
            amaçlıyoruz.
          </p>
          <h3>Çerez Nedir?</h3>
          <p>
            Çerezler, kullanıcıların web sitelerini daha verimli bir şekilde kullanabilmeleri adına,
            cihazlarına kaydedilen küçük dosyacıklardır. Çerezler vasıtasıyla kullanıcıların
            bilgilerinin işleniyor olması sebebiyle, 6698 sayılı Kişisel Verilerin Korunması Kanunu
            gereğince, kullanıcıların bilgilendirilmeleri ve onaylarının alınması gerekmektedir.
            Bizler de siz sevgili ziyaretçilerimizin, web sitemizden en verimli şekilde
            yararlanabilmelerini ve siz sevgili ziyaretçilerimizin kullanıcı deneyimlerinin
            geliştirilebilmesini sağlamak adına, çeşitli çerezler kullanmaktayız.
            <br />
            <br />
            <b>1. Zorunlu Çerezler</b>
            <br />
            Zorunlu çerezler, web sitesine ilişkin temel işlevleri etkinleştirerek web sitesinin
            kullanılabilir hale gelmesini sağlayan çerezlerdir. Web sitesi bu çerezler olmadan
            düzgün çalışmaz.
            <br />
            <br />
            <b>2. Performans Çerezleri</b>
            <br />
            Performans çerezleri, ziyaretçilerin web sitesine ilişkin kullanım bilgilerini ve
            tercihlerini anonim olarak toplayan ve bu sayede web sitesinin performansının
            geliştirilmesine olanak sağlayan çerezlerdir.
            <br />
            <br />
            <b>3. Fonksiyonel Çerezler</b>
            <br />
            Fonksiyonel çerezler, kullanıcıların web sitesine ilişkin geçmiş kullanımlarından yola
            çıkılarak gelecekteki ziyaretlerinde tanınmalarını ve hatırlanmalarını sağlayan ve bu
            sayede web sitelerinin kullanıcılara dil, bölge vb. gibi kişiselleştirilmiş bir hizmet
            sunmasına olanak tanıyan çerezlerdir.
            <br />
            <br />
            <b>4. Reklam Çerezleri</b>
            <br />
            Reklam çerezleri, üçüncü taraflara ait çerezlerdir ve web sitelerinde ziyaretçilerin
            davranışlarını izlemek için kullanılırlar. Bu çerezlerin amaçları, ziyaretçilerin
            ihtiyaçlarına yönelik ilgilerini çekecek reklamların gösterilmesine yardımcı olmaktır ve
            sorumluluğu çerez sahibi üçüncü taraflara aittir.
          </p>
          <h3>Web Sitemizde Şu Anda Çerez Kullanıyor Muyuz?</h3>
          Şu anda web sitemizde, üstte belirtilen çerez türlerinin hiçbiri kullanılmamaktadır. Bu
          yüzden de web sitemizin herhangi bir yerinde çerez kullanımı için kullanıcılarımızdan bir
          onay almaya gerek duymamaktayız. Ancak ilerleyen aşamalarda web sitemizdeki
          ziyaretçilerimizin deneyimlerini arttırmak için bazı çerezler kullanma gereği duyabiliriz.
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
