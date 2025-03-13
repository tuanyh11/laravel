import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Comic, Genre } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Bookmark, Heart, Star, TrendingUp } from 'lucide-react';

interface WelcomeProps {
    canLogin: boolean;
    canRegister: boolean;
    featuredComics: Comic[];
    popularComics: Comic[];
    genreGroups: Genre[];
    latestComics: Comic[];
}

export default function Welcome({
    canLogin,
    canRegister,
    featuredComics,
    popularComics,
    genreGroups,
    latestComics,
}: WelcomeProps) {
    return (
        <>
            <Authenticated header={<Header />} footer={<Footer />}>
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-green-50 to-blue-50 px-4 py-16 md:py-24">
                    <div className="container mx-auto flex flex-col items-center md:flex-row">
                        <div className="mb-8 w-full text-center md:mb-0 md:w-1/2 md:text-left">
                            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                                Read and Write <br />
                                Endless Stories
                            </h1>
                            <p className="mb-8 text-lg text-gray-600 md:text-xl">
                                Join millions of readers and writers on the
                                world's most creative community platform.
                            </p>
                            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <Link
                                    href="/home"
                                    className="rounded-full bg-green-600 px-6 py-3 text-center text-lg font-semibold text-white transition hover:bg-green-700"
                                >
                                    Start Reading
                                </Link>
                                <a
                                    href="#"
                                    className="rounded-full border-2 border-green-600 bg-white px-6 py-3 text-center text-lg font-semibold text-green-600 transition hover:bg-green-50"
                                >
                                    Start Writing
                                </a>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            {featuredComics && featuredComics.length > 0 ? (
                                <div className="relative h-96 overflow-hidden rounded-xl shadow-2xl">
                                    <img
                                        src={
                                            featuredComics[0].thumbnail?.url ||
                                            '/api/placeholder/600/400'
                                        }
                                        alt={featuredComics[0].title}
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                                        <h2 className="mb-2 text-2xl font-bold">
                                            {featuredComics[0].title}
                                        </h2>
                                        <p className="mb-2 line-clamp-2">
                                            {featuredComics[0].description}
                                        </p>
                                        <div className="flex items-center text-sm">
                                            <span className="mr-4">
                                                By{' '}
                                                {featuredComics[0].author?.name}
                                            </span>
                                            <span className="flex items-center">
                                                <BookOpen className="mr-1 h-4 w-4" />
                                                {featuredComics[0].read_count.toLocaleString()}{' '}
                                                reads
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src="/api/placeholder/600/400"
                                    alt="Wattpad Stories"
                                    className="rounded-xl shadow-2xl"
                                />
                            )}
                        </div>
                    </div>
                </section>

                {/* Featured Stories Carousel */}
                {featuredComics && featuredComics.length > 1 && (
                    <section className="bg-white py-12">
                        <div className="container mx-auto px-4">
                            <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                Featured Stories
                            </h2>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                                {featuredComics.slice(1).map((comic) => (
                                    <Link
                                        key={comic.id}
                                        href={`/comic/${comic.slug}`}
                                        className="group"
                                    >
                                        <div className="overflow-hidden rounded-lg bg-white shadow-md transition group-hover:shadow-xl">
                                            <div className="relative aspect-[2/3] overflow-hidden">
                                                <img
                                                    src={
                                                        comic.thumbnail?.url ||
                                                        '/api/placeholder/250/350'
                                                    }
                                                    alt={comic.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                {comic.status ===
                                                    'completed' && (
                                                    <span className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                                                        Completed
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-3">
                                                <h3 className="mb-1 line-clamp-1 font-semibold group-hover:text-green-600">
                                                    {comic.title}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    By {comic.author?.name}
                                                </p>
                                                <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                                                    <span className="flex items-center">
                                                        <BookOpen className="mr-1 h-3 w-3" />{' '}
                                                        {(
                                                            comic.read_count ||
                                                            0
                                                        ).toLocaleString()}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Star className="mr-1 h-3 w-3" />{' '}
                                                        {(
                                                            comic.vote_count ||
                                                            0
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Why Choose Wattpad */}
                <section className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-12 text-3xl font-bold md:text-4xl">
                            Why Choose Wattpad?
                        </h2>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <BookOpen className="h-8 w-8" />
                                </div>
                                <h3 className="mb-4 text-xl font-semibold">
                                    Millions of Stories
                                </h3>
                                <p className="text-gray-600">
                                    Explore a vast library of stories across
                                    every genre imaginable.
                                </p>
                            </div>
                            <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <Bookmark className="h-8 w-8" />
                                </div>
                                <h3 className="mb-4 text-xl font-semibold">
                                    Creative Freedom
                                </h3>
                                <p className="text-gray-600">
                                    Write and share your stories with a global
                                    audience.
                                </p>
                            </div>
                            <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <Heart className="h-8 w-8" />
                                </div>
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

                {/* Popular Stories */}
                {popularComics && popularComics.length > 0 && (
                    <section className="bg-white py-16">
                        <div className="container mx-auto px-4">
                            <div className="mb-8 flex items-center justify-between">
                                <h2 className="text-2xl font-bold md:text-3xl">
                                    Popular Stories
                                </h2>
                                <Link
                                    href="/explore"
                                    className="text-green-600 hover:underline"
                                >
                                    View All
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                {popularComics.map((comic) => (
                                    <Link
                                        key={comic.id}
                                        href={`/comic/${comic.slug}`}
                                        className="group"
                                    >
                                        <div className="overflow-hidden rounded-lg transition hover:shadow-lg">
                                            <div className="relative aspect-[2/3] overflow-hidden">
                                                <img
                                                    src={
                                                        comic.thumbnail?.url ||
                                                        '/api/placeholder/250/350'
                                                    }
                                                    alt={comic.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className="absolute right-2 top-2 flex items-center rounded-full bg-black/60 px-2 py-1 text-xs text-white">
                                                    <TrendingUp className="mr-1 h-3 w-3" />{' '}
                                                    {(
                                                        comic.read_count || 0
                                                    ).toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <h3 className="line-clamp-1 font-medium group-hover:text-green-600">
                                                    {comic.title}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    By {comic.author?.name}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Browse by Genre */}
                {genreGroups && genreGroups.length > 0 && (
                    <section className="bg-gray-50 py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
                                Browse by Genre
                            </h2>
                            <div className="grid gap-8 md:grid-cols-2">
                                {genreGroups.map((genre) => (
                                    <div
                                        key={genre.id}
                                        className="rounded-xl bg-white p-6 shadow-lg"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-xl font-semibold">
                                                {genre.name}
                                            </h3>
                                            <Link
                                                href={`/genres/${genre.slug}`}
                                                className="text-sm font-medium text-green-600 hover:underline"
                                            >
                                                View More
                                            </Link>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {genre.comics &&
                                                genre.comics
                                                    .slice(0, 4)
                                                    .map((comic) => (
                                                        <Link
                                                            key={comic.id}
                                                            href={`/comic/${comic.slug}`}
                                                            className="group flex items-start gap-3"
                                                        >
                                                            <div className="h-20 w-14 flex-shrink-0 overflow-hidden rounded-md">
                                                                <img
                                                                    src={
                                                                        comic
                                                                            .thumbnail
                                                                            ?.url ||
                                                                        '/api/placeholder/100/140'
                                                                    }
                                                                    alt={
                                                                        comic.title
                                                                    }
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h4 className="line-clamp-2 font-medium group-hover:text-green-600">
                                                                    {
                                                                        comic.title
                                                                    }
                                                                </h4>
                                                                <p className="text-xs text-gray-500">
                                                                    By{' '}
                                                                    {
                                                                        comic
                                                                            .author
                                                                            ?.name
                                                                    }
                                                                </p>
                                                                <div className="mt-1 flex items-center text-xs text-gray-500">
                                                                    <BookOpen className="mr-1 h-3 w-3" />{' '}
                                                                    {(
                                                                        comic.read_count ||
                                                                        0
                                                                    ).toLocaleString()}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* How Wattpad Works */}
                <section className="container mx-auto px-4 py-16">
                    <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
                        How Wattpad Works
                    </h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                                <BookOpen className="h-12 w-12 text-green-600" />
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
                                <Bookmark className="h-12 w-12 text-green-600" />
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
                                <Heart className="h-12 w-12 text-green-600" />
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

                {/* Latest Stories */}
                {latestComics && latestComics.length > 0 && (
                    <section className="bg-gray-50 py-16">
                        <div className="container mx-auto px-4">
                            <div className="mb-8 flex items-center justify-between">
                                <h2 className="text-2xl font-bold md:text-3xl">
                                    Latest Stories
                                </h2>
                                <Link
                                    href="/latest"
                                    className="text-green-600 hover:underline"
                                >
                                    View All
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                {latestComics.map((comic) => (
                                    <Link
                                        key={comic.id}
                                        href={`/comic/${comic.slug}`}
                                        className="group"
                                    >
                                        <div className="overflow-hidden rounded-lg bg-white shadow-md transition group-hover:shadow-xl">
                                            <div className="aspect-[2/3] overflow-hidden">
                                                <img
                                                    src={
                                                        comic.thumbnail?.url ||
                                                        '/api/placeholder/250/350'
                                                    }
                                                    alt={comic.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="mb-1 line-clamp-1 font-semibold group-hover:text-green-600">
                                                    {comic.title}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    By {comic.author?.name}
                                                </p>
                                                <div className="mt-2 flex items-center text-xs text-gray-600">
                                                    <BookOpen className="mr-1 h-3 w-3" />{' '}
                                                    {comic.read_count.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Join Wattpad */}
                <section className="bg-green-600 py-16 text-center text-white">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                            Start Your Story Today
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-xl">
                            Whether you're a reader or a writer, your next
                            adventure awaits. Join our community of storytellers
                            and book lovers.
                        </p>
                        <div className="space-x-4">
                            <a
                                href="#"
                                className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-green-600 transition hover:bg-green-50"
                            >
                                Join Wattpad
                            </a>
                        </div>
                    </div>
                </section>
            </Authenticated>
        </>
    );
}
