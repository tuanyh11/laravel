import DefaultLayout from '@/Layouts/DefaultLayout';
import { Comic } from '@/types/custom';
import { Link } from '@inertiajs/react';
import { FC, useState } from 'react';

const Detail: FC<{ comic: Comic }> = ({ comic }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isVoted, setIsVoted] = useState(false);
    const [voteCount, setVoteCount] = useState(12453);

    const toggleFollow = () => setIsFollowing(!isFollowing);
    const toggleBookmark = () => setIsBookmarked(!isBookmarked);
    const toggleVote = () => {
        setIsVoted(!isVoted);
        setVoteCount((prev) => (isVoted ? prev - 1 : prev + 1));
    };

    console.log(comic);
    const readCount = comic.chapters.reduce((a, b) => a + b.read_count, 0);
    const commentCount = comic.chapters.reduce(
        (a, b) => a + b.comments_count,
        0,
    );
    return (
        <DefaultLayout>
            <div className="min-h-screen bg-gray-100 font-sans">
                {/* Main Content */}
                <main className="mx-auto max-w-6xl p-4">
                    {/* Story Header */}
                    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md md:flex-row">
                        {/* Book Cover */}
                        <div className="p-6 md:w-1/3">
                            {/* <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-300 shadow-lg">
                            <img
                                src={`/storage/${comic.thumbnail.model_id}/${comic.thumbnail.file_name}`}
                                alt="Story Cover"
                                className="h-full w-full object-cover"
                            />
                        </div> */}
                            <div className="book-container">
                                <div className="book">
                                    <img
                                        src={comic.thumbnail.url}
                                        alt="Story Cover"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 space-y-3">
                                <Link
                                    href={`/comic/${comic.id}/chapter/${comic.chapters[0].id}`}
                                    className="w-full block text-center rounded-full bg-orange-500 py-3 font-bold text-white hover:bg-orange-600"
                                >
                                    Start Reading
                                </Link>
                                <div className="flex justify-between">
                                    <button
                                        onClick={toggleVote}
                                        className={`mr-2 flex w-1/2 items-center justify-center rounded-full border py-2 ${isVoted ? 'border-orange-500 bg-orange-100 text-orange-500' : 'border-gray-300'}`}
                                    >
                                        <span className="mr-2">❤️</span>{' '}
                                        {voteCount.toLocaleString()}
                                    </button>
                                    <button
                                        onClick={toggleBookmark}
                                        className={`ml-2 flex w-1/2 items-center justify-center rounded-full border py-2 ${isBookmarked ? 'border-blue-500 bg-blue-100 text-blue-500' : 'border-gray-300'}`}
                                    >
                                        <span className="mr-2">
                                            {isBookmarked ? '🔖' : '🔖'}
                                        </span>{' '}
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Story Details */}
                        <div className="p-6 md:w-2/3">
                            <div className="flex items-start justify-between">
                                <h1 className="text-3xl font-bold">
                                    {comic.title}
                                </h1>
                                <div className="flex space-x-2 text-gray-500">
                                    <button>⋮</button>
                                </div>
                            </div>

                            {/* Author Info */}
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="mr-3 flex aspect-square items-center justify-center rounded-full bg-green-500 px-3 uppercase text-white">
                                        <span>{comic.author.name[0]}</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            {comic.author.name}
                                        </p>
                                        {/* <p className="text-sm text-gray-500">
                                        {comic.author.email}
                                    </p> */}
                                    </div>
                                </div>
                                <button
                                    onClick={toggleFollow}
                                    className={`rounded-full px-4 py-2 text-sm font-semibold ${isFollowing ? 'bg-gray-200' : 'bg-orange-500 text-white'}`}
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </button>
                            </div>

                            {/* Story Stats */}
                            <div className="mt-6 flex space-x-6 text-sm text-gray-700">
                                <div className="flex items-center">
                                    <span className="mr-2">👁️</span>
                                    <span>{readCount} Reads</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">📝</span>
                                    <span>{comic.chapters.length} Parts</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">💬</span>
                                    <span>{commentCount} Comments</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {comic.tags.map((item) => (
                                    <span
                                        key={item.id}
                                        className="rounded-full bg-gray-200 px-3 py-1 text-sm"
                                    >
                                        #{item.name}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <h2 className="mb-2 text-xl font-semibold">
                                    Description
                                </h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: comic.description,
                                    }}
                                    className="text-gray-700"
                                ></div>
                            </div>

                            {/* Table of Contents Preview */}
                            <div className="mt-8">
                                <h2 className="mb-4 text-xl font-semibold">
                                    Table of Contents
                                </h2>
                                <div className="space-y-3">
                                    {comic.chapters.map((chapter) => (
                                        <Link
                                            key={chapter.id}
                                            className="flex items-center justify-between border-b p-3"
                                            href={`/comic/${chapter.id}/chapter/${chapter.id}`}
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    Chapter {chapter.order}:{' '}
                                                    {chapter.title}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Last updated:{' '}
                                                    {new Date(
                                                        chapter.updated_at,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'short',
                                                            day: '2-digit',
                                                        },
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-2">
                                                    <small>👁️</small>{' '}
                                                    {chapter.read_count}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <small>💬</small>{' '}
                                                    {chapter.comments_count}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                    {comic.chapters.length > 4 && (
                                        <button className="font-semibold text-orange-500 hover:underline">
                                            View all {comic.chapters.length}{' '}
                                            parts
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}

                    {/* Recommended Stories */}
                    <div className="mb-12 mt-8">
                        <h2 className="mb-4 text-xl font-semibold">
                            You might also like
                        </h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {[1, 2, 3, 4].map((index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-lg bg-white shadow-md"
                                >
                                    <div className="aspect-[2/3] bg-gray-300">
                                        <img
                                            src={`/api/placeholder/${300 + index}/${450 + index}`}
                                            alt={`Recommended Story ${index}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-semibold">
                                            Book Title {index}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            by Author {index}
                                        </p>
                                        <div className="mt-2 flex items-center text-sm text-gray-700">
                                            <span className="mr-2">
                                                👁️ 1.2M
                                            </span>
                                            <span>❤️ 85K</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </DefaultLayout>
    );
};

export default Detail;
