import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Authenticated header={<Header />} footer={<Footer />}>
                <section className="container mx-auto flex items-center px-4 py-16">
                    <div className="w-1/2 pr-12">
                        <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900">
                            Read and Write <br />
                            Endless Stories
                        </h1>
                        <p className="mb-8 text-xl text-gray-600">
                            Join millions of readers and writers on the world's
                            most creative community platform.
                        </p>
                        <div className="space-x-4">
                            <Link
                                href="/home"
                                className="rounded-full bg-green-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-green-700"
                            >
                                Start Reading
                            </Link>
                            <a
                                href="#"
                                className="rounded-full border-2 border-green-600 bg-white px-6 py-3 text-lg font-semibold text-green-600 transition hover:bg-green-50"
                            >
                                Start Writing
                            </a>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <img
                            src="/api/placeholder/600/400"
                            alt="Wattpad Stories"
                            className="rounded-xl shadow-2xl"
                        />
                    </div>
                </section>
                <section className="bg-gray-50 py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="mb-12 text-4xl font-bold">
                            Why Choose Wattpad?
                        </h2>
                        <div className="grid grid-cols-3 gap-8">
                            <div className="rounded-xl bg-white p-6 shadow-md">
                                <i className="fas fa-book-open mb-4 text-5xl text-green-600"></i>
                                <h3 className="mb-4 text-xl font-semibold">
                                    Millions of Stories
                                </h3>
                                <p className="text-gray-600">
                                    Explore a vast library of stories across
                                    every genre imaginable.
                                </p>
                            </div>
                            <div className="rounded-xl bg-white p-6 shadow-md">
                                <i className="fas fa-pencil-alt mb-4 text-5xl text-green-600"></i>
                                <h3 className="mb-4 text-xl font-semibold">
                                    Creative Freedom
                                </h3>
                                <p className="text-gray-600">
                                    Write and share your stories with a global
                                    audience.
                                </p>
                            </div>
                            <div className="rounded-xl bg-white p-6 shadow-md">
                                <i className="fas fa-users mb-4 text-5xl text-green-600"></i>
                                <h3 className="mb-4 text-xl font-semibold">
                                    Community
                                </h3>
                                <p className="text-gray-600">
                                    Connect with readers and writers from around
                                    the world.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container mx-auto py-16">
                    <h2 className="mb-12 text-center text-4xl font-bold">
                        How Wattpad Works
                    </h2>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                                <i className="fas fa-book-open text-4xl text-green-600"></i>
                            </div>
                            <h3 className="mb-4 text-xl font-semibold">
                                Discover Stories
                            </h3>
                            <p className="text-gray-600">
                                Browse millions of free stories across every
                                genre, from romance to sci-fi.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                                <i className="fas fa-pencil-alt text-4xl text-green-600"></i>
                            </div>
                            <h3 className="mb-4 text-xl font-semibold">
                                Create Your Story
                            </h3>
                            <p className="text-gray-600">
                                Use our free writing tools to bring your
                                imagination to life, chapter by chapter.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                                <i className="fas fa-users text-4xl text-green-600"></i>
                            </div>
                            <h3 className="mb-4 text-xl font-semibold">
                                Connect & Grow
                            </h3>
                            <p className="text-gray-600">
                                Engage with readers, get feedback, and build
                                your audience worldwide.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="mb-12 text-4xl font-bold">
                            Wattpad by the Numbers
                        </h2>
                        <div className="grid grid-cols-4 gap-8">
                            <div className="rounded-xl bg-white p-6 shadow-md">
                                <h3 className="mb-4 text-4xl font-bold text-green-600">
                                    90M+
                                </h3>
                                <p className="text-gray-600">Monthly Readers</p>
                            </div>
                            <div className="rounded-xl bg-white p-6 shadow-md">
                                <h3 className="mb-4 text-4xl font-bold text-green-600">
                                    4M+
                                </h3>
                                <p className="text-gray-600">
                                    Stories Published Daily
                                </p>
                            </div>
                            <div className="rounded-xl bg-white p-6 shadow-md">
                                <h3 className="mb-4 text-4xl font-bold text-green-600">
                                    150+
                                </h3>
                                <p className="text-gray-600">
                                    Countries Represented
                                </p>
                            </div>
                            <div className="rounded-xl bg-white p-6 shadow-md">
                                <h3 className="mb-4 text-4xl font-bold text-green-600">
                                    70+
                                </h3>
                                <p className="text-gray-600">
                                    Languages Supported
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container mx-auto py-16">
                    <h2 className="mb-12 text-center text-4xl font-bold">
                        Popular Categories
                    </h2>
                    <div className="grid grid-cols-5 gap-6">
                        <div className="transform overflow-hidden rounded-xl bg-white shadow-md transition hover:scale-105">
                            <img
                                src="/api/placeholder/250/350"
                                alt="Romance"
                                className="w-full"
                            />
                            <div className="p-4 text-center">
                                <h3 className="font-semibold">Romance</h3>
                            </div>
                        </div>
                        <div className="transform overflow-hidden rounded-xl bg-white shadow-md transition hover:scale-105">
                            <img
                                src="/api/placeholder/250/350"
                                alt="Fantasy"
                                className="w-full"
                            />
                            <div className="p-4 text-center">
                                <h3 className="font-semibold">Fantasy</h3>
                            </div>
                        </div>
                        <div className="transform overflow-hidden rounded-xl bg-white shadow-md transition hover:scale-105">
                            <img
                                src="/api/placeholder/250/350"
                                alt="Science Fiction"
                                className="w-full"
                            />
                            <div className="p-4 text-center">
                                <h3 className="font-semibold">
                                    Science Fiction
                                </h3>
                            </div>
                        </div>
                        <div className="transform overflow-hidden rounded-xl bg-white shadow-md transition hover:scale-105">
                            <img
                                src="/api/placeholder/250/350"
                                alt="Mystery"
                                className="w-full"
                            />
                            <div className="p-4 text-center">
                                <h3 className="font-semibold">Mystery</h3>
                            </div>
                        </div>
                        <div className="transform overflow-hidden rounded-xl bg-white shadow-md transition hover:scale-105">
                            <img
                                src="/api/placeholder/250/350"
                                alt="Teen Fiction"
                                className="w-full"
                            />
                            <div className="p-4 text-center">
                                <h3 className="font-semibold">Teen Fiction</h3>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-green-600 py-16 text-center text-white">
                    <h2 className="mb-6 text-4xl font-bold">
                        Start Your Story Today
                    </h2>
                    <p className="mb-8 text-xl">
                        Whether you're a reader or a writer, your next adventure
                        awaits.
                    </p>
                    <div className="space-x-4">
                        <a
                            href="#"
                            className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-green-600 transition hover:bg-green-50"
                        >
                            Join Wattpad
                        </a>
                    </div>
                </section>
            </Authenticated>
        </>
    );
}
