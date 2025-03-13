import { Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    DollarSign,
    Globe,
    HandCoins,
    HelpCircle,
    Inbox,
    LogOut,
    PlusCircle,
    Settings,
    User,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Avatar from './UI/Avatar';

const Header = () => {
    const { auth, wallet } = usePage().props;
    const user = auth.user;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);

    return (
        <header className="flex items-center justify-between bg-white p-4 text-black/80 shadow-md">
            <div className="flex items-center space-x-4">
                <Link href="/" className="text-2xl font-bold">
                    Wattpad
                </Link>
                <nav className="flex space-x-4">
                    <a href="#" className="hover:text-green-200">
                        Browse
                    </a>
                    <a href="#" className="hover:text-green-200">
                        Community
                    </a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search stories, authors"
                        className="w-64 rounded-full py-2 pl-10 pr-4"
                    />
                    <button className="absolute left-3 top-3 text-gray-500">
                        <FaSearch />
                    </button>
                </div>
                <button className="rounded-full bg-white px-4 py-2">
                    Write
                </button>
                {user ? (
                    <>
                        {/* Wallet Section */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsWalletDropdownOpen(
                                        !isWalletDropdownOpen,
                                    )
                                }
                                className="flex items-center space-x-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
                            >
                                <HandCoins className="h-4 w-4 text-green-600" />
                                <span className="font-medium">
                                    {wallet?.balance || '0.00'}{' '}
                                    {wallet.currency}
                                </span>
                            </button>

                            {isWalletDropdownOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border bg-white shadow-lg">
                                    <div className="p-3">
                                        <div className="mb-2 text-center">
                                            <p className="text-sm text-gray-600">
                                                Your Balance
                                            </p>
                                            <p className="text-xl font-bold text-green-600">
                                                {wallet?.balance || '0'}{' '}
                                                {wallet.currency}
                                            </p>
                                        </div>
                                        <Link
                                            href={route('wallet.add-funds')}
                                            className="flex w-full items-center justify-center rounded-md bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700"
                                        >
                                            <PlusCircle className="mr-2 h-4 w-4" />{' '}
                                            Add Funds
                                        </Link>
                                        <div className="mt-2">
                                            <Link
                                                href={route('wallet.index')}
                                                className="flex w-full items-center justify-center rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                <Wallet className="mr-2 h-4 w-4" />{' '}
                                                Manage Wallet
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="text-gray-700 hover:text-green-600">
                            <Bell className="h-6 w-6" />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex items-center space-x-2"
                            >
                                <Avatar user={user} size="md" />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border bg-white shadow-lg">
                                    <div className="py-1">
                                        <Link
                                            href={`/profile`}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <User className="mr-3 h-5 w-5" /> My
                                            Profile
                                        </Link>
                                        <a
                                            href="#"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <Inbox className="mr-3 h-5 w-5" />{' '}
                                            Inbox
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <Bell className="mr-3 h-5 w-5" />{' '}
                                            Notifications
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <BookOpen className="mr-3 h-5 w-5" />{' '}
                                            Library
                                        </a>
                                        {/* <Link
                                            href={route('wallet.index')}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <Wallet className="mr-3 h-5 w-5" />{' '}
                                            My Wallet
                                        </Link> */}
                                        <div className="my-1 border-t"></div>
                                        <a
                                            href="#"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <Globe className="mr-3 h-5 w-5" />{' '}
                                            Language: English
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <HelpCircle className="mr-3 h-5 w-5" />{' '}
                                            Help
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <Settings className="mr-3 h-5 w-5" />{' '}
                                            Settings
                                        </a>
                                        <div className="my-1 border-t"></div>
                                        <button
                                            onClick={() =>
                                                router.post(route('logout'))
                                            }
                                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            <LogOut className="mr-3 h-5 w-5" />{' '}
                                            Log Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="rounded-full bg-white px-4 py-2"
                        >
                            Login
                        </Link>
                        <button className="rounded-full bg-white px-4 py-2">
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
