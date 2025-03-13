import { Comic } from '@/types/custom';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    laravelVersion: string;
    phpVersion: string;
    featuredComic: Comic;
    comicList: Comic[];
}

export default function Welcome({ comicList }: Props) {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [featuredComic, setFeaturedComic] = useState<Comic>(comicList[0]);
    const [selectedComicId, setSelectedComicId] = useState<number | null>(null);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleComicClick = (comic: ComicItem) => {
        // Nếu click vào comic đã được chọn, không làm gì
        if (selectedComicId === comic.id) return;

        setSelectedComicId(comic.id);

        // Trong thực tế, bạn sẽ gọi API để lấy chi tiết của truyện
        // Đây là mô phỏng thay đổi dữ liệu
        setFeaturedComic(comic);

        // Reset trạng thái mô tả
        setShowFullDescription(false);
    };

    console.log('====================================');
    console.log(comicList);
    console.log('====================================');

    return (
        <>
            <Head title="Comic Collection" />
            <div className="relative min-h-screen overflow-hidden bg-black text-white">
                {/* Main Comic Showcase */}
                <div className="relative h-screen">
                    {/* Background Image with fade transition */}
                    <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700">
                        {featuredComic.thumbnail ? (
                            <img
                                src={featuredComic.thumbnail.url}
                                alt={featuredComic.thumbnail.alt}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-r from-gray-900 to-gray-800"></div>
                        )}
                    </div>

                    {/* Overlay Gradient */}
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

                    {/* Comic Information */}
                    <div className="relative z-20 max-w-4xl px-8 pt-20 md:px-12 lg:px-16">
                        <h1 className="mb-2 text-6xl font-bold transition-all duration-500">
                            {featuredComic.title}
                        </h1>

                        <div className="mb-4 flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <span className="font-bold">
                                    {featuredComic.rating}
                                </span>
                                <span className="text-gray-400">
                                    {featuredComic.votes}
                                </span>
                            </div>
                            <span>•</span>
                            <span>{featuredComic.year}</span>
                            <span>•</span>
                            <span>{featuredComic.genre}</span>
                        </div>

                        <div
                            dangerouslySetInnerHTML={{
                                __html: featuredComic.description,
                            }}
                            className="mb-8 max-w-3xl text-gray-300 transition-all duration-300"
                        ></div>

                        <div className="mb-20 flex gap-4">
                            <button className="rounded-sm border border-white px-8 py-3 transition-colors hover:bg-white hover:text-black">
                                Read preview
                            </button>
                            <button className="flex items-center gap-2 rounded-sm bg-yellow-500 px-8 py-3 text-black transition-colors hover:bg-yellow-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Read now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comics Carousel */}
                <div className="absolute bottom-0 left-0 right-0 z-20 pb-8">
                    <div className="mb-4 flex items-center">
                        <button className="swiper-button-prev mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <button className="swiper-button-next flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={16}
                        slidesPerView={2}
                        navigation={{
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next',
                        }}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                            1280: { slidesPerView: 9 },
                        }}
                        className="comics-swiper"
                    >
                        {comicList.map((comic) => (
                            <SwiperSlide key={comic.id}>
                                <div
                                    className={`w-40 flex-shrink-0 transform cursor-pointer transition-all duration-300 ${selectedComicId === comic.id ? 'scale-105 ring-2 ring-yellow-500' : 'hover:scale-105'}`}
                                    onClick={() => handleComicClick(comic)}
                                >
                                    <div className="h-56 overflow-hidden rounded-sm bg-gray-800">
                                        {comic.image ? (
                                            <img
                                                src={comic.image}
                                                alt={comic.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gray-700 text-xs text-gray-400">
                                                {comic.title}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}
