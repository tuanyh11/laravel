// LoginPage.jsx
import { router, usePage } from '@inertiajs/react';
import { Link } from 'lucide-react';
import { useState } from 'react';

const Login = () => {
    const { errors, flash } = usePage().props;
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/login', formData);
    };

    const handleGoogleLogin = () => {
        window.location.href = '/auth/google/redirect';
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="/api/placeholder/120/40"
                        alt="Wattpad logo"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Đăng nhập vào tài khoản của bạn
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Hoặc{' '}
                        <Link
                            href="/register"
                            className="font-medium text-orange-600 hover:text-orange-500"
                        >
                            đăng ký miễn phí
                        </Link>
                    </p>
                </div>

                {/* Flash Messages */}
                {flash && flash.message && (
                    <div className="mb-4 rounded-md bg-green-50 p-4">
                        <div className="text-sm text-green-700">
                            {flash.message}
                        </div>
                    </div>
                )}

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                                placeholder="Mật khẩu"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                checked={formData.remember}
                                onChange={handleChange}
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Lưu thông tin đăng nhập
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link
                                href="/forgot-password"
                                className="font-medium text-orange-600 hover:text-orange-500"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>

                {/* Divider */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-gray-50 px-2 text-gray-500">
                                Hoặc tiếp tục với
                            </span>
                        </div>
                    </div>
                </div>

                {/* Social Login Buttons */}
                <div className="mt-6">
                    <button
                        onClick={handleGoogleLogin}
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                        <svg
                            className="mr-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M3.064 7.51A9.996 9.996 0 0 1 12 2c2.695 0 4.959.99 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123-.2.6-.314 1.24-.314 1.9 0 .66.114 1.3.314 1.9.786 2.364 2.99 4.123 5.595 4.123 1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045 0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49z"
                                fill="#EA4335"
                            />
                        </svg>
                        Đăng nhập với Google
                    </button>
                </div>

                {/* Terms and Privacy */}
                <div className="mt-8 text-center text-xs text-gray-500">
                    Bằng cách đăng nhập, bạn đồng ý với{' '}
                    <a
                        href="#"
                        className="text-orange-600 hover:text-orange-500"
                    >
                        Điều khoản dịch vụ
                    </a>{' '}
                    và{' '}
                    <a
                        href="#"
                        className="text-orange-600 hover:text-orange-500"
                    >
                        Chính sách bảo mật
                    </a>{' '}
                    của chúng tôi.
                </div>
            </div>
        </div>
    );
};

export default Login;
