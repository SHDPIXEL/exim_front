import { useAds } from '../context/AdContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import getActiveMedia from '../helper/GetActiveMedia';

const BottomAds = ({ leftPosition, rightPosition }) => {
  const { selectedAds } = useAds();

  const getMedia = (position) => {
    const ad = selectedAds?.find(ad =>
      ad.selectedMedia.some(media => media.position === position)
    );
    return getActiveMedia(ad);
  };

  const leftMedia = getMedia(leftPosition);
  const rightMedia = getMedia(rightPosition);

  return (
    <div className="container">
      <div className="row mb-4">
        {/* Left Ad */}
        {leftMedia.length > 0 && (
          <div className="col-md-6 mt-2 mb-2">
            <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 3000 }} loop={true} >
              {leftMedia.map((media, index) => (
                <SwiperSlide key={index}>
                  {media.type === 'image' ? (
                    <img src={media.src} alt="Advertisement" className="w-100 ad-image-top" />
                  ) : (
                    <video controls={false} autoPlay loop muted className="w-100 ad-image-top">
                      <source src={media.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Right Ad */}
        {rightMedia.length > 0 && (
          <div className="col-md-6 mt-2 mb-2">
            <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 3000 }} loop={true}>
              {rightMedia.map((media, index) => (
                <SwiperSlide key={index}>
                  {media.type === 'image' ? (
                    <img src={media.src} alt="Advertisement" className="w-100 ad-image-top" />
                  ) : (
                    <video controls={false} autoPlay muted loop className="w-100 ad-image-top">
                      <source src={media.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomAds;
