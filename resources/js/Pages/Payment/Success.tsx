import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Eye, HandCoins } from 'lucide-react';
import { useEffect } from 'react';

const PaymentSuccessPage = () => {
    const { transaction, auth, flash } = usePage().props;

    // Hiệu ứng confetti khi trang load
    useEffect(() => {
        // Nếu có thư viện confetti, bạn có thể thêm vào đây
        // Ví dụ: import confetti from 'canvas-confetti';
        // confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }, []);

    return (
        <DefaultLayout>
            <Head title="Payment Successful" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="mb-8 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-8 text-center">
                                <div className="flex justify-center">
                                    <CheckCircle className="h-16 w-16 text-green-500" />
                                </div>
                                <h1 className="mt-4 text-3xl font-bold text-gray-900">
                                    Thanh toán thành công!
                                </h1>
                                <p className="mt-2 text-lg text-gray-600">
                                    Giao dịch của bạn đã được xử lý thành công.
                                </p>
                            </div>

                            {transaction && (
                                <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                    <div className="px-6 py-4">
                                        <h2 className="mb-4 text-lg font-semibold text-gray-800">
                                            Chi tiết giao dịch
                                        </h2>

                                        <div className="space-y-3">
                                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                                <span className="text-gray-600">
                                                    Mã giao dịch
                                                </span>
                                                <span className="font-medium">
                                                    {
                                                        transaction.transaction_ref
                                                    }
                                                </span>
                                            </div>

                                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                                <span className="text-gray-600">
                                                    Phương thức thanh toán
                                                </span>
                                                <span className="font-medium">
                                                    VNPay{' '}
                                                    {transaction.bank_code &&
                                                        `(${transaction.bank_code})`}
                                                </span>
                                            </div>

                                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                                <span className="text-gray-600">
                                                    Số tiền
                                                </span>
                                                <span className="font-medium text-green-600">
                                                    {transaction.amount}{' '}
                                                    {transaction.currency ||
                                                        'VND'}
                                                </span>
                                            </div>

                                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                                <span className="text-gray-600">
                                                    Ngày thanh toán
                                                </span>
                                                <span className="font-medium">
                                                    {new Date(
                                                        transaction.created_at,
                                                    ).toLocaleString('vi-VN')}
                                                </span>
                                            </div>

                                            <div className="flex justify-between pb-2">
                                                <span className="text-gray-600">
                                                    Trạng thái
                                                </span>
                                                <span className="font-medium text-green-600">
                                                    Thành công
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {transaction &&
                                transaction.type === 'wallet_topup' && (
                                    <div className="mt-6 text-center">
                                        <p className="text-lg text-gray-700">
                                            Số tiền{' '}
                                            <span className="font-bold text-green-600">
                                                {transaction.amount}{' '}
                                                {transaction.currency || 'VND'}
                                            </span>{' '}
                                            đã được thêm vào ví của bạn.
                                        </p>
                                    </div>
                                )}

                            {transaction &&
                                transaction.type === 'chapter_purchase' && (
                                    <div className="mt-6 text-center">
                                        <p className="text-lg text-gray-700">
                                            Bạn đã mua thành công chapter "
                                            {transaction.chapter_title}"
                                        </p>
                                    </div>
                                )}

                            <div className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                                {transaction &&
                                    transaction.type === 'wallet_topup' && (
                                        <Link
                                            href={route('wallet.index')}
                                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        >
                                            <HandCoins className="mr-2 h-5 w-5" />
                                            Xem ví của tôi
                                        </Link>
                                    )}

                                {transaction &&
                                    transaction.type === 'chapter_purchase' &&
                                    transaction.chapter_id && (
                                        <Link
                                            href={route('chapter.show', {
                                                slug: transaction.comic_slug,
                                                chapter_id:
                                                    transaction.chapter_id,
                                            })}
                                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        >
                                            <Eye className="mr-2 h-5 w-5" />
                                            Đọc chapter
                                        </Link>
                                    )}

                                <Link
                                    href={route('home')}
                                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Về trang chủ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default PaymentSuccessPage;
