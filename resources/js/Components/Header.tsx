import { Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    Globe,
    HandCoins,
    HelpCircle,
    Inbox,
    LogOut,
    Menu,
    PlusCircle,
    Settings,
    User,
    Wallet,
    X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Avatar from './UI/Avatar';

const Header = () => {
    const { auth, wallet } = usePage().props;
    const user = auth.user;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const walletDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
            if (
                walletDropdownRef.current &&
                !walletDropdownRef.current.contains(event.target as Node)
            ) {
                setIsWalletDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className="bg-white text-black/80 shadow-md">
            {/* Desktop Header */}
            <div className="flex items-center justify-between p-4 md:px-6">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-xl font-bold md:text-2xl">
                        Wattpad
                    </Link>
                </div>

                <div className="flex items-center space-x-2 md:space-x-4">
                    {/* Search bar - hidden on mobile unless expanded */}
                    <div
                        className={`${isSearchOpen ? 'absolute left-0 right-0 top-0 z-50 flex bg-white p-2' : 'hidden'} md:relative md:flex md:bg-transparent`}
                    >
                        <input
                            type="text"
                            placeholder="Search stories, authors"
                            className="w-full rounded-full py-2 pl-10 pr-4 md:w-64"
                        />
                        <button className="absolute left-3 top-3 text-gray-500 md:left-5">
                            <FaSearch />
                        </button>
                        {isSearchOpen && (
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="ml-2 p-2 md:hidden"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Search icon for mobile */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="text-gray-700 md:hidden"
                    >
                        <FaSearch className="h-5 w-5" />
                    </button>

                    {/* <button className="hidden rounded-full bg-white px-4 py-2 md:block">
                        Write
                    </button> */}

                    {user ? (
                        <>
                            {/* Wallet Section - Show on tablet/desktop */}
                            <div
                                className="relative hidden sm:block"
                                ref={walletDropdownRef}
                            >
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

                            {/* Notifications - Show on tablet/desktop */}
                            <button className="hidden text-gray-700 hover:text-green-600 sm:block">
                                <Bell className="h-6 w-6" />
                            </button>

                            {/* User Menu */}
                            <div className="relative" ref={dropdownRef}>
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
                                                <User className="mr-3 h-5 w-5" />{' '}
                                                My Profile
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

                                            {/* Show wallet in dropdown on mobile */}
                                            <Link
                                                href={route('wallet.index')}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 sm:hidden"
                                            >
                                                <Wallet className="mr-3 h-5 w-5" />{' '}
                                                My Wallet
                                            </Link>

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
                                                className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                <LogOut className="mr-3 h-5 w-5" />{' '}
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <button
                                className="ml-2 md:hidden"
                                onClick={() =>
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                }
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="rounded-full bg-white px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base"
                            >
                                Login
                            </Link>
                            <button className="rounded-full bg-white px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base">
                                Sign Up
                            </button>

                            {/* Mobile menu button */}
                            <button
                                className="ml-2 md:hidden"
                                onClick={() =>
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                }
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="border-t bg-white px-4 py-2 md:hidden">
                    <nav className="flex flex-col space-y-3">
                        <a href="#" className="py-2 hover:text-green-600">
                            Browse
                        </a>
                        <a href="#" className="py-2 hover:text-green-600">
                            Community
                        </a>
                        <a href="#" className="py-2 hover:text-green-600">
                            Write
                        </a>
                        {user && (
                            <Link
                                href={route('wallet.index')}
                                className="flex items-center py-2 hover:text-green-600"
                            >
                                <Wallet className="mr-2 h-5 w-5" />
                                <span>
                                    {wallet?.balance || '0.00'}{' '}
                                    {wallet.currency}
                                </span>
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
