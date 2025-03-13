import DefaultLayout from '@/Layouts/DefaultLayout';
import { Comic } from '@/types/custom';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import { FC, useState } from 'react';

// Cập nhật kiểu Chapter nếu cần trong file types/custom.ts
// interface Chapter {
//   id: number;
//   title: string;
//   order: number;
//   description: string;
//   read_count: number;
//   vote_count: number;
//   comments_count: number;
//   updated_at: string;
//   pricing: number;
//   is_paid_content?: boolean;
//   is_unlocked?: boolean;
// }

const Detail: FC<{ comic: Comic; walletBalance?: number }> = ({
    comic,
    walletBalance = 0,
}) => {
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

    // Xử lý click vào chapter cần mở khóa
    const handleChapterClick = async (chapter) => {
        // Nếu chapter miễn phí hoặc đã mở khóa, điều hướng trực tiếp đến chapter
        if (!chapter.pricing || chapter.is_unlocked) {
            router.visit(`/comic/${comic.slug}/chapter/${chapter.id}`);
            return;
        }

        // Nếu có đủ tiền trong ví, xác nhận mua chapter
        if (walletBalance >= chapter.pricing) {
            if (
                confirm(
                    `Bạn có muốn mua chapter này với giá ${chapter.pricing} VND không?`,
                )
            ) {
                try {
                    // Gọi API để mua chapter bằng số dư ví
                    const response = await axios.post(
                        `/chapters/${chapter.id}/purchase`,
                    );
                    if (response.data.success) {
                        // Nếu mua thành công, chuyển đến trang chapter
                        router.visit(
                            `/comic/${comic.id}/chapter/${chapter.id}`,
                        );
                    }
                } catch (error) {
                    alert(
                        'Có lỗi xảy ra khi mua chapter. Vui lòng thử lại sau.',
                    );
                    console.error(error);
                }
            }
        } else {
            // Nếu không đủ tiền, chuyển đến trang nạp tiền
            if (
                confirm(
                    'Số dư trong ví không đủ. Bạn có muốn nạp thêm tiền không?',
                )
            ) {
                router.visit('/wallet/add-funds');
            }
        }
    };

    const readCount = comic.chapters.reduce((a, b) => a + b.read_count, 0);
    const commentCount = comic.chapters.reduce(
        (a, b) => a + b.comments_count,
        0,
    );

    console.log('====================================');
    console.log(comic.chapters);
    console.log('====================================');
    return (
        <DefaultLayout>
            <div className="min-h-screen bg-gray-100 font-sans">
                {/* Main Content */}
                <main className="mx-auto max-w-6xl p-4">
                    {/* Story Header */}
                    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md md:flex-row">
                        {/* Book Cover */}
                        <div className="p-6 md:w-1/3">
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
                                    href={`/comic/${comic.slug}/chapter/${comic.chapters[0].id}`}
                                    className="block w-full rounded-full bg-orange-500 py-3 text-center font-bold text-white hover:bg-orange-600"
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

                            {/* Wallet Balance (nếu có) */}
                            {walletBalance > 0 && (
                                <div className="mt-4 rounded-lg bg-gray-100 p-3">
                                    <p className="text-sm font-medium">
                                        Số dư ví:{' '}
                                        <span className="text-green-600">
                                            {walletBalance.toLocaleString()} VND
                                        </span>
                                    </p>
                                </div>
                            )}

                            {/* Table of Contents Preview */}
                            <div className="mt-8">
                                <h2 className="mb-4 text-xl font-semibold">
                                    Table of Contents
                                </h2>
                                <div className="space-y-3">
                                    {comic.chapters.map((chapter) => {
                                        // Kiểm tra xem chapter có phải trả phí không
                                        const isPaid = chapter.pricing > 0;
                                        // Kiểm tra xem chapter đã được mở khóa chưa (nếu có thông tin)
                                        const isUnlocked =
                                            chapter.is_unlocked === true;

                                        return (
                                            <div
                                                key={chapter.id}
                                                className={`flex items-center justify-between border-b p-3 ${isPaid && !isUnlocked ? 'bg-gray-50' : ''}`}
                                                onClick={() =>
                                                    handleChapterClick(chapter)
                                                }
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div>
                                                    <div className="flex items-center">
                                                        <p className="font-medium">
                                                            Chapter{' '}
                                                            {chapter.order}:{' '}
                                                            {chapter.title}
                                                        </p>
                                                        {isPaid && (
                                                            <span className="ml-2 flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                                                                {isUnlocked ? (
                                                                    <span className="flex items-center">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="mr-1 h-3 w-3"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                        Đã mở
                                                                    </span>
                                                                ) : (
                                                                    <span className="flex items-center">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="mr-1 h-3 w-3"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                        {chapter.pricing.toLocaleString()}{' '}
                                                                        VND
                                                                    </span>
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
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
                                            </div>
                                        );
                                    })}
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
