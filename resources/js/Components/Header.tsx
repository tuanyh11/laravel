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
        <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-500 to-pink-500 shadow-md">
            {/* Desktop Header */}
            <div className="flex items-center justify-between p-4 md:px-6">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="text-xl font-bold text-white md:text-2xl"
                    >
                        Wattpad
                    </Link>
                </div>

                <div className="flex items-center space-x-2 md:space-x-4">
                    {/* Search bar - hidden on mobile unless expanded */}
                    <div
                        className={`${isSearchOpen ? 'absolute left-0 right-0 top-0 z-50 flex bg-gradient-to-r from-blue-500 to-pink-500 p-2' : 'hidden'} md:relative md:flex md:bg-transparent`}
                    >
                        <input
                            type="text"
                            placeholder="Tìm kiếm truyện, tác giả..."
                            className="w-full rounded-full border border-pink-200 bg-white/90 py-2 pl-10 pr-4 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400 md:w-64"
                        />
                        <button className="absolute left-3 top-3 text-gray-500 md:left-5">
                            <FaSearch />
                        </button>
                        {isSearchOpen && (
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="ml-2 p-2 text-white md:hidden"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Search icon for mobile */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="text-white hover:text-blue-100 md:hidden"
                    >
                        <FaSearch className="h-5 w-5" />
                    </button>

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
                                    className="flex items-center space-x-1 rounded-full border border-pink-200 bg-white/90 px-3 py-1.5 text-sm transition-colors hover:bg-white"
                                >
                                    <HandCoins className="h-4 w-4 text-pink-500" />
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
                                                    Số dư của bạn
                                                </p>
                                                <p className="text-xl font-bold text-pink-600">
                                                    {wallet?.balance || '0'}{' '}
                                                    {wallet.currency}
                                                </p>
                                            </div>
                                            <Link
                                                href={route('wallet.add-funds')}
                                                className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-pink-500 py-2 text-sm font-medium text-white transition-colors hover:from-blue-600 hover:to-pink-600"
                                            >
                                                <PlusCircle className="mr-2 h-4 w-4" />{' '}
                                                Nạp tiền
                                            </Link>
                                            <div className="mt-2">
                                                <Link
                                                    href={route('wallet.index')}
                                                    className="flex w-full items-center justify-center rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                                >
                                                    <Wallet className="mr-2 h-4 w-4" />{' '}
                                                    Quản lý ví
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Notifications - Show on tablet/desktop */}
                            <button className="hidden text-white transition-colors hover:text-blue-100 sm:block">
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
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <User className="mr-3 h-5 w-5" />{' '}
                                                Hồ sơ của tôi
                                            </Link>
                                            <a
                                                href="#"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Inbox className="mr-3 h-5 w-5" />{' '}
                                                Tin nhắn
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-pink-600"
                                            >
                                                <Bell className="mr-3 h-5 w-5" />{' '}
                                                Thông báo
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <BookOpen className="mr-3 h-5 w-5" />{' '}
                                                Thư viện
                                            </a>

                                            {/* Show wallet in dropdown on mobile */}
                                            <Link
                                                href={route('wallet.index')}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-pink-600 sm:hidden"
                                            >
                                                <Wallet className="mr-3 h-5 w-5" />{' '}
                                                Ví của tôi
                                            </Link>

                                            <div className="my-1 border-t"></div>
                                            <a
                                                href="#"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Globe className="mr-3 h-5 w-5" />{' '}
                                                Ngôn ngữ: Tiếng Việt
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <HelpCircle className="mr-3 h-5 w-5" />{' '}
                                                Trợ giúp
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Settings className="mr-3 h-5 w-5" />{' '}
                                                Cài đặt
                                            </a>
                                            <div className="my-1 border-t"></div>
                                            <button
                                                onClick={() =>
                                                    router.post(route('logout'))
                                                }
                                                className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                                            >
                                                <LogOut className="mr-3 h-5 w-5" />{' '}
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <button
                                className="ml-2 text-white md:hidden"
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
                                className="rounded-full border border-white bg-transparent px-3 py-1.5 text-sm text-white transition-colors hover:bg-white hover:text-blue-600 md:px-4 md:py-2 md:text-base"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-full bg-white px-3 py-1.5 text-sm text-blue-600 transition-colors hover:bg-blue-50 md:px-4 md:py-2 md:text-base"
                            >
                                Đăng ký
                            </Link>

                            {/* Mobile menu button */}
                            <button
                                className="ml-2 text-white md:hidden"
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
                <div className="border-t border-pink-300 bg-blue-50 px-4 py-2 md:hidden">
                    <nav className="flex flex-col space-y-3">
                        <a
                            href="#"
                            className="py-2 text-blue-700 transition-colors hover:text-pink-600"
                        >
                            Khám phá
                        </a>
                        <a
                            href="#"
                            className="py-2 text-blue-700 transition-colors hover:text-pink-600"
                        >
                            Cộng đồng
                        </a>
                        <a
                            href="#"
                            className="py-2 text-blue-700 transition-colors hover:text-pink-600"
                        >
                            Viết
                        </a>
                        {user && (
                            <Link
                                href={route('wallet.index')}
                                className="flex items-center py-2 text-blue-700 transition-colors hover:text-pink-600"
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
