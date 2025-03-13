import { Head, Link } from '@inertiajs/react';
import { Eye, Play, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Comic {
    id: number;
    title: string;
    description: string;
    rating: string;
    votes: string;
    year: string;
    genre: string;
    read_count: number;
    vote_count?: number;
    image?: string;
    thumbnail?: {
        url: string;
        alt: string;
    };
    genres?: Array<{
        id: number;
        name: string;
    }>;
    tags?: Array<{
        id: number;
        name: string;
    }>;
    author?: {
        id: number;
        name: string;
        avatar?: string;
    };
    chapters?: number;
}

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    laravelVersion: string;
    phpVersion: string;
    featuredComic: Comic;
    comicList: Comic[];
}

export default function Welcome({ featuredComic, comicList }: Props) {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [currentComic, setCurrentComic] = useState<Comic>(featuredComic);
    const [selectedComicId, setSelectedComicId] = useState<number | null>(
        featuredComic.id,
    );
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(
        null,
    );

    // Set initial active slide index
    const initialSlideIndex = comicList.findIndex(
        (comic) => comic.id === featuredComic.id,
    );

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleComicClick = (
        comic: Comic,
        index: number,
        event: React.MouseEvent,
    ) => {
        // Stop event propagation to prevent any other click handlers
        event.stopPropagation();

        // If clicking on already selected comic, do nothing
        if (selectedComicId === comic.id) return;

        setSelectedComicId(comic.id);

        // Update the featured comic display
        setCurrentComic(comic);

        // Reset description state
        setShowFullDescription(false);

        // Slide to the clicked comic with a slight delay to ensure proper slide operation
        if (swiperInstance) {
            swiperInstance.slideTo(index + 1);
        }
    };

    // Handle slide change from Swiper
    const handleSlideChange = (swiper: SwiperType) => {
        const realIndex = swiper.realIndex; // Get the real index accounting for looping
        const comic = comicList[realIndex];

        if (comic && comic.id !== selectedComicId) {
            setSelectedComicId(comic.id);
            setCurrentComic(comic);
            setShowFullDescription(false);
        }
    };

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!swiperInstance) return;

            if (e.key === 'ArrowLeft') {
                swiperInstance.slidePrev();
            } else if (e.key === 'ArrowRight') {
                swiperInstance.slideNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [swiperInstance]);

    return (
        <>
            <Head title="Comic Collection" />
            <div className="relative min-h-screen overflow-hidden bg-black text-white">
                {/* Main Comic Showcase */}
                <div className="relative h-screen">
                    {/* Background Image with fade transition */}
                    <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700">
                        {currentComic.thumbnail ? (
                            <img
                                src={currentComic.thumbnail.url}
                                alt={currentComic.thumbnail.alt}
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
                            {currentComic.title}
                        </h1>

                        <div className="mb-4 mt-8 flex items-center gap-4 text-sm">
                            {currentComic.rating && (
                                <>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold">
                                            {currentComic.rating}
                                        </span>
                                        <span className="text-gray-400">
                                            {currentComic.votes}
                                        </span>
                                    </div>
                                    <span>•</span>
                                </>
                            )}

                            {/* Read Count */}
                            <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4 text-gray-400" />
                                <span>
                                    {currentComic.read_count?.toLocaleString() ||
                                        0}{' '}
                                    reads
                                </span>
                            </div>
                            <span>•</span>

                            {/* Vote Count */}
                            <div className="flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4 text-gray-400" />
                                <span>
                                    {currentComic.vote_count?.toLocaleString() ||
                                        0}{' '}
                                    votes
                                </span>
                            </div>
                            <span>•</span>

                            {currentComic.year && (
                                <>
                                    <span>{currentComic.year}</span>
                                    <span>•</span>
                                </>
                            )}

                            {currentComic.genres &&
                                currentComic.genres.length > 0 && (
                                    <span>
                                        {currentComic.genres
                                            .map((g) => g.name)
                                            .join(', ')}
                                    </span>
                                )}

                            {!currentComic.genres && currentComic.genre && (
                                <span>{currentComic.genre}</span>
                            )}

                            {currentComic.author && (
                                <>
                                    <span>•</span>
                                    <span>By {currentComic.author.name}</span>
                                </>
                            )}
                        </div>

                        {/* Tags */}
                        {currentComic.tags && currentComic.tags.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                                {currentComic.tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300 hover:bg-gray-700"
                                    >
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div
                            dangerouslySetInnerHTML={{
                                __html: currentComic.description,
                            }}
                            className={`mb-8 max-w-3xl text-gray-300 transition-all duration-300 ${
                                !showFullDescription && 'line-clamp-3'
                            }`}
                        ></div>

                        {currentComic.description &&
                            currentComic.description.length > 150 && (
                                <button
                                    onClick={toggleDescription}
                                    className="mb-6 text-sm text-yellow-500 hover:text-yellow-400"
                                >
                                    {showFullDescription
                                        ? 'Show less'
                                        : 'Show more'}
                                </button>
                            )}

                        <div className="mb-20 flex gap-4">
                            <button className="rounded-sm border border-white px-8 py-3 transition-colors hover:bg-white hover:text-black">
                                Read preview
                            </button>
                            <Link
                                href="/home"
                                className="flex items-center gap-2 rounded-sm bg-yellow-500 px-8 py-3 text-black transition-colors hover:bg-yellow-400"
                            >
                                <Play className="h-5 w-5" />
                                Read now
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Comics Carousel */}
                <div className="absolute bottom-0 left-0 right-0 z-20 pb-8">
                    <Swiper
                        spaceBetween={15}
                        slidesPerView="auto"
                        initialSlide={
                            initialSlideIndex >= 0 ? initialSlideIndex : 0
                        }
                        modules={[Autoplay, Pagination]}
                        speed={1000}
                        loop={true}
                        breakpoints={{
                            640: { slidesPerView: 3, centeredSlides: true },
                            768: { slidesPerView: 5, centeredSlides: true },
                            1024: { slidesPerView: 7, centeredSlides: true },
                            1280: { slidesPerView: 7, centeredSlides: true },
                        }}
                        className="comics-swiper"
                        onSwiper={setSwiperInstance}
                        onSlideChange={handleSlideChange}
                        watchSlidesProgress={true}
                        slideToClickedSlide={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                    >
                        {comicList.map((comic, index) => (
                            <SwiperSlide key={comic.id}>
                                <div
                                    className={`w-full transform cursor-pointer overflow-hidden rounded-md p-2 transition-all duration-500 ${
                                        selectedComicId === comic.id
                                            ? 'scale-y-110 opacity-100'
                                            : 'scale-90 opacity-70'
                                    }`}
                                    onClick={(e) =>
                                        handleComicClick(comic, index, e)
                                    }
                                >
                                    <div className="h-60 bg-gray-800 shadow-lg">
                                        {comic.thumbnail ? (
                                            <img
                                                src={comic.thumbnail.url}
                                                alt={
                                                    comic.thumbnail.alt ||
                                                    comic.title
                                                }
                                                className={`${
                                                    selectedComicId === comic.id
                                                        ? 'scale-105 brightness-110'
                                                        : 'brightness-75'
                                                } h-full w-full object-cover transition-all duration-500`}
                                            />
                                        ) : comic.image ? (
                                            <img
                                                src={comic.image}
                                                alt={comic.title}
                                                className={`${
                                                    selectedComicId === comic.id
                                                        ? 'scale-105 brightness-110'
                                                        : 'brightness-75'
                                                } h-full w-full object-cover transition-all duration-500`}
                                            />
                                        ) : (
                                            <div
                                                className={`flex h-full w-full items-center justify-center bg-gray-700 text-xs text-gray-400 ${
                                                    selectedComicId === comic.id
                                                        ? 'bg-gray-600'
                                                        : ''
                                                }`}
                                            >
                                                {comic.title}
                                            </div>
                                        )}
                                    </div>

                                    {/* Add a transparent overlay to improve click target area */}
                                    <div className="absolute inset-0 z-10"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}
