import Image from 'next/image';
import Popup from '../../Popup';

function AnnouncementPopup() {
  return (
    <Popup mode="auto" title="hello">
      <Image
        src="/img/29ekim.jpg"
        width={500}
        height={500}
      />
    </Popup>
  );
}

export default AnnouncementPopup;
