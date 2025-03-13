import DefaultLayout from '@/Layouts/DefaultLayout';
import { LaravelPagination, Transaction } from '@/types/custom';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowDownCircle,
    ArrowUpCircle,
    DollarSign,
    PlusCircle,
    ShoppingCart,
} from 'lucide-react';
import { FC, useState } from 'react';

const WalletPage: FC<{ transactions: LaravelPagination<Transaction> }> = ({
    transactions,
}) => {
    const { wallet } = usePage().props;
    const [amount, setAmount] = useState('');

    // Function to format date
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Function to get transaction icon based on type
    const getTransactionIcon = (
        type: 'deposit' | 'withdrawal' | 'purchase',
    ) => {
        switch (type) {
            case 'deposit':
                return <ArrowDownCircle className="h-6 w-6 text-green-500" />;
            case 'withdrawal':
                return <ArrowUpCircle className="h-6 w-6 text-red-500" />;
            case 'purchase':
                return <ShoppingCart className="h-6 w-6 text-blue-500" />;
            default:
                return <DollarSign className="h-6 w-6 text-gray-500" />;
        }
    };

    return (
        <DefaultLayout>
            <Head title="My Wallet" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-3xl font-bold text-gray-900">
                        My Wallet
                    </h1>

                    {/* Wallet Overview */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="mb-4 md:mb-0">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Wallet Balance
                                    </h2>
                                    <div className="mt-2 flex items-center">
                                        <DollarSign className="mr-2 h-8 w-8 text-green-600" />
                                        <span className="text-3xl font-bold">
                                            {wallet?.balance || '0.00'}
                                        </span>
                                        <span className="ml-2 text-gray-600">
                                            {wallet?.currency || 'USD'}
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href={route('wallet.add-funds')}
                                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-green-300 hover:bg-green-700 focus:border-green-800 focus:outline-none focus:ring active:bg-green-800"
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Funds
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Add Funds Form with VNPay */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 p-6">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800">
                                Add Funds with VNPay
                            </h2>

                            <form
                                action={route(
                                    'payment.vnpay.create-wallet-payment',
                                )}
                                method="POST"
                            >
                                <input
                                    type="hidden"
                                    name="_token"
                                    // value={document
                                    //     .querySelector(
                                    //         'meta[name="csrf-token"]',
                                    //     )
                                    //     .getAttribute('content')}
                                />

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
                                            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder=""
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
                                            ).format(parseFloat(amount))}{' '}
                                            {wallet.currency}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-blue-300 hover:bg-blue-700 focus:border-blue-800 focus:outline-none focus:ring active:bg-blue-800 md:w-auto"
                                >
                                    Proceed with VNPay
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 p-6">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800">
                                Transaction History
                            </h2>

                            {transactions && transactions.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                >
                                                    Type
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                >
                                                    Description
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                >
                                                    Amount
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                >
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {transactions.data.map(
                                                (transaction) => (
                                                    <tr key={transaction.id}>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <div className="flex items-center">
                                                                {getTransactionIcon(
                                                                    transaction.type,
                                                                )}
                                                                <span className="ml-2 text-sm font-medium text-gray-900">
                                                                    {transaction.type
                                                                        .charAt(
                                                                            0,
                                                                        )
                                                                        .toUpperCase() +
                                                                        transaction.type.slice(
                                                                            1,
                                                                        )}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {
                                                                transaction.description
                                                            }
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                            <span
                                                                className={`font-medium ${parseFloat(transaction.amount) >= 0 ? 'text-green-600' : 'text-red-600'}`}
                                                            >
                                                                {parseFloat(
                                                                    transaction.amount,
                                                                ) >= 0
                                                                    ? '+'
                                                                    : ''}
                                                                {
                                                                    transaction.amount
                                                                }{' '}
                                                                {wallet?.currency ||
                                                                    'USD'}
                                                            </span>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {formatDate(
                                                                transaction.created_at,
                                                            )}
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="py-8 text-center">
                                    <p className="text-gray-500">
                                        No transactions yet
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default WalletPage;
