import { useAds } from '../context/AdContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import getActiveMedia from '../helper/GetActiveMedia';
import ReactGA from "react-ga4";

const handleAdClick = (details, link) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'ad_click',
    company_name: details.company || "untitled",
    ad_id: details.id|| "untitled",
    ad_position : details.position || "untitled",
    debug_mode : true,
  });


  // Redirect or perform any other action after click
  window.open(link, "_blank");
};

const BottomAds = ({ leftPosition, rightPosition }) => {
  const { selectedAds, handleAdClick } = useAds();

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
            <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop={true} >
              {leftMedia.map((media, index) => (
                <SwiperSlide key={index}>
                 <a title='View More' onClick={() => handleAdClick({company : media.company_name, id : media.name},media.url)} className='cursor-pointer' target="_blank" rel="noopener noreferrer">
                 {media.type === 'image' ? (
                      <img src={media.src} alt="Advertisement" className="w-100 ad-image-top" />
                    ) : (
                      <video controls={false} autoPlay loop muted className="w-100 ad-image-top">
                        <source src={media.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Right Ad */}
        {rightMedia.length > 0 && (
          <div className="col-md-6 mt-2 mb-2">
            <Swiper modules={[Pagination, Autoplay]} autoplay={{ delay: 3000 }} loop={true}>
              {rightMedia.map((media, index) => (
                <SwiperSlide key={index}>
                <a title='View More' onClick={() => handleAdClick({company : media.company_name, id : media.name },media.url)} className='cursor-pointer' target="_blank" rel="noopener noreferrer">
                  
                    {media.type === 'image' ? (
                      <img src={media.src} alt="Advertisement" className="w-100 ad-image-top" />
                    ) : (
                      <video controls={false} autoPlay muted loop className="w-100 ad-image-top">
                        <source src={media.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </a>
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
