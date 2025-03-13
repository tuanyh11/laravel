import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { HandCoins } from 'lucide-react';
import { useState } from 'react';

const AddFundsPage = () => {
    const { auth, wallet, flash } = usePage().props;
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form submission through Inertia router
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { data } = await axios.post(
            route('payment.vnpay.create-wallet-payment'),
            {
                amount: amount,
            },
        );

        window.location.href = data.url;
    };

    return (
        <DefaultLayout>
            <Head title="Add Funds to Wallet" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Add Funds to Wallet
                        </h1>
                        <Link
                            href={route('wallet.index')}
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-800 ring-gray-300 hover:bg-gray-300 focus:border-gray-500 focus:outline-none focus:ring active:bg-gray-400"
                        >
                            Return to Wallet
                        </Link>
                    </div>

                    {flash.error && (
                        <div className="mb-6 border-l-4 border-red-500 bg-red-100 p-4 text-red-700">
                            <p>{flash.error}</p>
                        </div>
                    )}

                    {/* Current Balance */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 p-6">
                            <h2 className="text-lg font-medium text-gray-800">
                                Current Balance
                            </h2>
                            <div className="mt-2 flex items-center">
                                <HandCoins className="mr-2 h-6 w-6 text-green-600" />
                                <span className="text-2xl font-bold">
                                    {wallet?.balance || '0.00'}
                                </span>
                                <span className="ml-2 text-gray-600">
                                    {wallet?.currency || 'USD'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Add Funds with VNPay */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="mb-4 flex items-center">
                                    {/* <img
                                        src="/images/vnpay-logo.png"
                                        alt="VNPay Logo"
                                        className="mr-2 h-8"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                'https://via.placeholder.com/32x32?text=VNPay';
                                        }}
                                    /> */}
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Pay with VNPay
                                    </h2>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="amount"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Amount ({wallet.currency})
                                        </label>
                                        <div className="relative mt-1 rounded-md shadow-sm">
                                            <input
                                                type="number"
                                                name="amount"
                                                id="amount"
                                                min="1"
                                                step="1"
                                                value={amount}
                                                onChange={(e) =>
                                                    setAmount(e.target.value)
                                                }
                                                className="block w-full rounded-md border-gray-300 pl-2 pr-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="0.00"
                                                required
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span className="text-gray-500 sm:text-sm">
                                                    {wallet.currency}
                                                </span>
                                            </div>
                                        </div>
                                        {amount && (
                                            <p className="mt-1 text-sm text-gray-500">
                                                ={' '}
                                                {new Intl.NumberFormat(
                                                    'vi-VN',
                                                ).format(
                                                    parseFloat(amount),
                                                )}{' '}
                                                VND
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-blue-300 hover:bg-blue-700 focus:border-blue-800 focus:outline-none focus:ring active:bg-blue-800 disabled:opacity-50"
                                    >
                                        {isSubmitting
                                            ? 'Processing...'
                                            : 'Proceed with VNPay'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                                    About VNPay
                                </h2>
                                <p className="mb-4 text-gray-600">
                                    VNPay is a leading payment service provider
                                    in Vietnam, allowing you to make payments
                                    through various methods:
                                </p>
                                <ul className="mb-4 list-disc space-y-1 pl-5 text-gray-600">
                                    <li>Internet Banking</li>
                                    <li>ATM cards / Domestic debit cards</li>
                                    <li>International credit/debit cards</li>
                                    <li>QR code payments</li>
                                    <li>E-wallets</li>
                                </ul>
                                <p className="text-gray-600">
                                    After clicking the "Proceed" button, you'll
                                    be redirected to VNPay's secure payment
                                    gateway to complete your transaction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddFundsPage;
