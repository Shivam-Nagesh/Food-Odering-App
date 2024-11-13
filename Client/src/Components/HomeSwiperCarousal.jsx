import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../CSS/Swipper.css';
import { useRef } from 'react';

const Carousel = () => {

    const swiperRef = useRef();
    const WOYM = [
        'WOYM-Pizza.avif',
        'WOYM-Burger.avif',
        'WOYM-Momos.avif',
        'WOYM-Chinese.avif',
        'WOYM-Rolls.avif',
        'WOYM-Biryani.avif',
        'WOYM-Dosa.avif',
        'WOYM-Cakes.avif',
        'WOYM-Pasta.avif',
        'WOYM-Samosa.avif',
        'WOYM-PavBhaji.avif',
        'WOYM-Noodles.avif',
        'WOYM-CholeBhature.avif',
        'WOYM-PureVeg.avif',
        'WOYM-SouthIndian.avif',
        'WOYM-Shawarma.avif',
        'WOYM-Salad.avif',
    ]

    return (
        <div className='SwipperContainer'>

            <Swiper
                allowTouchMove={true}
                spaceBetween={30}
                slidesPerGroup={3}
                slidesPerView={8}
                freeMode={true}
                // onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                {
                    WOYM.map((imgname,index) => (
                        <SwiperSlide key={index}>
                            <img src={`/${imgname}`} alt={`/${imgname}`} />
                        </SwiperSlide>
                    ))
                }
                <div slot="container-start" className='swiper-container-start'>
                    <div>What's on Your Mind?</div>
                    <div style={{ display: 'flex', gap: '5px', height: '3rem', alignItems: 'center' }}>
                        <button className='swiper-button swiper-prev-button' onClick={() => swiperRef.current.slidePrev()}>
                            {'<'}
                        </button>
                        <button className='swiper-button swiper-next-button' onClick={() => swiperRef.current.slideNext()}> {'>'} </button>
                    </div>
                </div>
            </Swiper>
        </div>
    );
}

export default Carousel



