import { Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    Globe,
    HelpCircle,
    Inbox,
    LogOut,
    Settings,
    User,
} from 'lucide-react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
    const user = usePage().props.auth.user;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
                    {/* <Search className="absolute left-3 top-3 text-gray-500" /> */}
                </div>
                <button className="rounded-full bg-white px-4 py-2">
                    Write
                </button>
                {user ? (
                    <>
                        <button className="text-gray-700 hover:text-green-600">
                            <Bell className="h-6 w-6" />
                        </button>

                        {/* <button className="text-gray-700 hover:text-green-600">
                            <Inbox className="h-6 w-6" />
                        </button> */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex items-center space-x-2"
                            >
                                {/* <img
                                    src="/api/placeholder/40/40"
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full"
                                /> */}
                                <span className="text-sm">{user.name}</span>
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
                                                router.post(
                                                    route('logout'),
                                                )
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
