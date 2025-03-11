import DefaultLayout from '@/Layouts/DefaultLayout';
import { Comic, Genre, LaravelPagination } from '@/types/custom';
import { Link } from '@inertiajs/react';
import { Book, FireExtinguisher, Heart, Star } from 'lucide-react';
import { FC, useState } from 'react';

const Home: FC<{
    comics: LaravelPagination<Comic>;
    genres: Genre[];
}> = ({ comics, genres }) => {
    const [activeTab, setActiveTab] = useState('for-you');
    const comicData = comics?.data;
    const genreData = genres;

    console.log(comicData);
    return (
        <DefaultLayout>
            <main className="container mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="mb-8 flex border-b">
                    <button
                        onClick={() => setActiveTab('for-you')}
                        className={`flex items-center space-x-2 px-4 py-2 ${
                            activeTab === 'for-you'
                                ? 'border-b-2 border-green-600 text-green-600'
                                : 'text-gray-600'
                        }`}
                    >
                        <Star className="h-5 w-5" />
                        <span>For You</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('trending')}
                        className={`flex items-center space-x-2 px-4 py-2 ${
                            activeTab === 'trending'
                                ? 'border-b-2 border-green-600 text-green-600'
                                : 'text-gray-600'
                        }`}
                    >
                        <FireExtinguisher className="h-5 w-5" />
                        <span>Trending</span>
                    </button>
                </div>

                {/* Genres Quick Filter */}
                <div className="mb-8 flex space-x-4 overflow-x-auto">
                    {genreData.map((genre) => (
                        <button
                            key={genre.id}
                            className="rounded-full border bg-white px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>

                {/* Stories Grid */}
                <div className="grid grid-cols-4 gap-6">
                    {comicData.map((story) => (
                        <Link
                            href={`/comic/${story.slug}`}
                            key={story.id}
                            className="overflow-hidden rounded-lg bg-white pt-8 drop-shadow-lg transition"
                        >
                            <div className="book-container">
                                <div className="book">
                                    <img
                                        src={story.thumbnail.url}
                                        alt={story.title}
                                        className="h-72 w-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="mb-2 truncate text-lg font-bold">
                                    {story.title}
                                </h3>
                                <p className="mb-2 text-sm text-gray-600">
                                    {story.author.name}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex space-x-2">
                                        {story.status === 'ongoing' && (
                                            <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">
                                                {story.status}
                                            </span>
                                        )}
                                        <span className="flex items-center">
                                            <Heart className="mr-1 h-4 w-4" />{' '}
                                            {story.vote_count}K
                                        </span>
                                        <span className="flex items-center">
                                            <Book className="mr-1 h-4 w-4" />{' '}
                                            {story.read_count}M
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </DefaultLayout>
    );
};

export default Home;
