import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Lost & Found',
};

export default function LandingPage() {
  return (
    <div>

      {/* Header */}
      <header className="hidden md:flex items-center justify-between mx-5 xl:mt-3">
        <div>
          {/* Logo */}
          <Link href={"/"}>
            <Image
              src="/logo.svg"
              alt="Logo"
              width={0}
              height={0}
              className="py-2 w-12"
            />
          </Link>
        </div>
        {/* Login */}
        <div>
          <Link href="/login">
            <p className="font-medium text-base text-red-500 transition ease-in-out hover:-translate-y-1 
                          hover:scale-110 antialiased xl:text-xl">
              LOG IN
            </p>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col mt-32 gap-7">

        {/* Product Name */}
        <div className="flex justify-center">
          <div className="ml-16 text-7xl text-gray-500 lg:text-8xl">
            <span>
              <span className="text-red-500">LOST</span> & </span>
            <span className="text-red-500">FOUND</span>
          </div>
        </div>

        {/* Short Description */}
        <div className="flex gap-3 justify-center text-lg text-gray-500 lg:text-2xl">
          <span>Find your items in a click</span>
        </div>

        {/* Get Started Button */}
        <div className="flex justify-center">
          <button className='py-2 outline outline-red-500 rounded-md transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 hover:outline-none duration-300'>
            <Link href="/login" className="px-8 py-3 text-red-600 font-bold hover:text-white">
              Get Started
            </Link>
          </button>
        </div>

      </section>

      {/* Features Section */}
      <section className="my-16 mx-10 space-y-14 md:mt-32 xl:mx-20 2xl:mx-36">

        {/* Centralized */}
        <div className="flex gap-3 xl:gap-10">
          <div className="flex basis-2/3 md:items-center xl:basis-3/5">
            <div>
              <h3 className="mb-2 text-xl font-bold text-red-500 md:text-2xl lg:text-3xl">Centralized Platform</h3>
              <p className="text-gray-600 text-pretty md:text-xl lg:text-2xl">
                Manage all your lost and found items in one convenient platform.
              </p>
            </div>
          </div>
          <div className="flex justify-end flex-grow xl:justify-center">
            <Image
              src="/Centralized.svg"
              alt="Feature 1"
              width={0}
              height={0}
              className="object-contain w-52 md:w-80 lg:w-96 transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>

        </div>

        {/* Real-Time Updates */}
        <div className="flex gap-5">
          <div className="flex basis-2/3 order-last items-center xl:basis-3/5">
            <div>
              <h3 className="mb-2 text-xl font-bold text-red-500 md:text-2xl lg:text-3xl">Real-time Updates</h3>
              <p className="text-gray-600 text-pretty md:text-xl lg:text-2xl">
                Stay informed with instant notifications on found items.
              </p>
            </div>
          </div>
          <div className="flex justify-end flex-grow xl:justify-center">
            <Image
              src="/RealTime.svg"
              alt="Feature 1"
              width={0}
              height={0}
              className="object-contain w-52 md:w-76 lg:w-96 transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
        </div>

        {/* Simple & Efficient */}
        <div className="flex gap-5">
          <div className="flex basis-2/3 md:items-center xl:basis-3/5">
            <div>
              <h3 className="mb-2 text-xl font-bold text-red-500 md:text-2xl lg:text-3xl">Simple & Efficient</h3>
              <p className="text-gray-600 text-pretty md:text-xl lg:text-2xl">
                Easily track and retrieve items with minimal effort. <br className="hidden xl:block"></br>Less Worries, Less Stress
              </p>
            </div>
          </div>
          <div className="flex justify-end flex-grow xl:justify-center">
            <Image
              src="/SimpleEfficient.svg"
              alt="Feature 1"
              width={0}
              height={0}
              className="object-contain w-52 md:w-76 lg:w-96 transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="pb-2">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          &#169; {new Date().getFullYear()} Lost & Found&#8482; . <span className="text-red-500">All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

