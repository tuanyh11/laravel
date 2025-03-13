import DefaultLayout from '@/Layouts/DefaultLayout';
import { Comic, Genre, LaravelPagination } from '@/types/custom';
import { Link } from '@inertiajs/react';
import { BookOpen, Heart, Star, TrendingUp } from 'lucide-react';
import { FC, useState } from 'react';

const Home: FC<{
    comics: LaravelPagination<Comic>;
    genres: Genre[];
}> = ({ comics, genres }) => {
    const [activeTab, setActiveTab] = useState('for-you');
    const comicData = comics?.data;
    const genreData = genres;

    return (
        <DefaultLayout>
            <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-pink-50">
                {/* Hero Section */}
                <div className="mb-8 bg-gradient-to-r from-blue-500 to-pink-500 py-12 text-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                            <div className="max-w-xl">
                                <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                                    Khám phá những câu chuyện tuyệt vời
                                </h1>
                                <p className="mb-6 text-lg">
                                    Hàng ngàn câu chuyện thú vị đang chờ đón bạn
                                    - đọc, chia sẻ và kết nối với cộng đồng yêu
                                    thích truyện.
                                </p>
                                <div className="flex gap-4">
                                    <Link
                                        href="#featured"
                                        className="rounded-full bg-white px-6 py-3 font-medium text-blue-600 transition-colors duration-300 hover:bg-blue-50"
                                    >
                                        Khám phá ngay
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full max-w-md">
                                <img
                                    src="/storage/media/ce038394-d8d7-4d00-9438-0cdbab7c8aa4.jpeg"
                                    alt="Reading illustrations"
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Tabs */}
                    <div className="mb-8 flex border-b">
                        <button
                            onClick={() => setActiveTab('for-you')}
                            className={`flex items-center space-x-2 px-4 py-2 ${
                                activeTab === 'for-you'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-600'
                            }`}
                        >
                            <Star className="h-5 w-5" />
                            <span>Dành cho bạn</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('trending')}
                            className={`flex items-center space-x-2 px-4 py-2 ${
                                activeTab === 'trending'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-600'
                            }`}
                        >
                            <TrendingUp className="h-5 w-5" />
                            <span>Xu hướng</span>
                        </button>
                    </div>

                    {/* Genres Quick Filter */}
                    <div className="mb-8 flex space-x-4 overflow-x-auto py-2">
                        {genreData.map((genre) => (
                            <button
                                key={genre.id}
                                className="rounded-full border bg-white px-4 py-2 text-sm shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>

                    {/* Stories Grid */}
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {comicData.map((story) => (
                            <Link
                                href={`/comic/${story.slug}`}
                                key={story.id}
                                className="overflow-hidden rounded-xl bg-white pt-4 shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl"
                            >
                                <div className="book-container py-4">
                                    <div className="book">
                                        <img
                                            src={story.thumbnail.url}
                                            alt={story.title}
                                            className="h-56 w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="mb-2 truncate text-lg font-bold text-gray-800">
                                        {story.title}
                                    </h3>
                                    <p className="mb-3 text-sm text-gray-600">
                                        {story.author.name}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex space-x-3">
                                            {story.status === 'ongoing' && (
                                                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                                    {story.status}
                                                </span>
                                            )}
                                            <span className="flex items-center">
                                                <Heart className="mr-1 h-4 w-4 text-pink-500" />{' '}
                                                {story.vote_count}K
                                            </span>
                                            <span className="flex items-center">
                                                <BookOpen className="mr-1 h-4 w-4 text-blue-500" />{' '}
                                                {story.read_count}M
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </DefaultLayout>
    );
};

export default Home;
