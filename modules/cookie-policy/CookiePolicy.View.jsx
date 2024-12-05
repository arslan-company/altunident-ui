import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';
import Navbar from '@/components/_App/Navbar';
import Box from '@/components/base/Box';
import Container from '@/components/base/Container';

export default function CookiePolicyView() {
  return (
    <>
      <Navbar transparent={false} />

      <PageBanner
        pageTitle="Çerez Politikası"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Çerez Politikası"
      />

      <Box pb="100px">
        <Container>
          <h2>Çerez Politikası</h2>

          <p>Son güncellenme: 15/05/2024</p>

          <p>
            Biz Atakent Grup olarak, güvenliğinize önem veriyor ve bu Çerez Politikası ile
            siz sevgili ziyaretçilerimize web sitemizdeki çerez kullanımı hakkında bilgi
            vermeyi amaçlıyoruz.
          </p>

          <h3>Çerez Nedir?</h3>

          <p>
            Çerezler, kullanıcıların web sitelerini daha verimli bir şekilde kullanabilmeleri
            adına, cihazlarına kaydedilen küçük dosyacıklardır. Çerezler vasıtasıyla
            kullanıcıların bilgilerinin işleniyor olması sebebiyle, 6698 sayılı Kişisel
            Verilerin Korunması Kanunu gereğince, kullanıcıların bilgilendirilmeleri ve
            onaylarının alınması gerekmektedir.

            Bizler de siz sevgili ziyaretçilerimizin, web sitemizden en verimli şekilde
            yararlanabilmelerini ve siz sevgili ziyaretçilerimizin kullanıcı deneyimlerinin
            geliştirilebilmesini sağlamak adına, çeşitli çerezler kullanmaktayız.
            <br />
            <br />

            <b>1. Zorunlu Çerezler</b>
            <br />
            Zorunlu çerezler, web sitesine ilişkin temel işlevleri etkinleştirerek web
            sitesinin kullanılabilir hale gelmesini sağlayan çerezlerdir. Web sitesi
            bu çerezler olmadan düzgün çalışmaz.
            <br />
            <br />

            <b>2. Performans Çerezleri</b>
            <br />
            Performans çerezleri, ziyaretçilerin web sitesine ilişkin kullanım bilgilerini
            ve tercihlerini anonim olarak toplayan ve bu sayede web sitesinin performansının
            geliştirilmesine olanak sağlayan çerezlerdir.
            <br />
            <br />

            <b>3. Fonksiyonel Çerezler</b>
            <br />
            Fonksiyonel çerezler, kullanıcıların web sitesine ilişkin geçmiş kullanımlarından
            yola çıkılarak gelecekteki ziyaretlerinde tanınmalarını ve hatırlanmalarını sağlayan
            ve bu sayede web sitelerinin kullanıcılara dil, bölge vb. gibi kişiselleştirilmiş
            bir hizmet sunmasına olanak tanıyan çerezlerdir.
            <br />
            <br />

            <b>4. Reklam Çerezleri</b>
            <br />
            Reklam çerezleri, üçüncü taraflara ait çerezlerdir ve web sitelerinde ziyaretçilerin
            davranışlarını izlemek için kullanılırlar. Bu çerezlerin amaçları, ziyaretçilerin
            ihtiyaçlarına yönelik ilgilerini çekecek reklamların gösterilmesine yardımcı olmaktır
            ve sorumluluğu çerez sahibi üçüncü taraflara aittir.
          </p>

          <h3>Web Sitemizde Şu Anda Çerez Kullanıyor Muyuz?</h3>
          Şu anda web sitemizde, üstte belirtilen çerez türlerinin hiçbiri kullanılmamaktadır.
          Bu yüzden de web sitemizin herhangi bir yerinde çerez kullanımı için kullanıcılarımızdan
          bir onay almaya gerek duymamaktayız.
          Ancak ilerleyen aşamalarda web sitemizdeki ziyaretçilerimizin deneyimlerini arttırmak
          için bazı çerezler kullanma gereği duyabiliriz.
        </Container>
      </Box>

      <Footer />
    </>
  );
}
