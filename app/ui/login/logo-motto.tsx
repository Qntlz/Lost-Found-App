import Link from "next/link";
import Image from "next/image";

export default function LogoMotto() {
    return (
        <div className="flex flex-col items-center justify-center text-red-500">
            {/* Logo */}
            <div className="flex items-center justify-center">
                <Link href={"/"}>
                    <Image
                        src="/logo.svg" // Replace with your logo path
                        alt="Logo"
                        width={0}
                        height={0}
                        className="w-[150px] transition-transform duration-300 ease-in-out hover:scale-110"
                        priority
                    />
                </Link>
            </div>
            <div className="space-y-3">
                <div className="flex justify-center">
                    <div className="text-3xl text-gray-500 xl:text-5xl">
                        <span>
                            <span className="text-red-500">LOST</span> & </span>
                        <span className="text-red-500">FOUND</span>
                    </div>
                </div>
                <div className="flex gap-3 justify-center text-lg text-gray-500 xl:text-2xl">
                    <span>Find your items in a click</span>
                </div>
            </div>
        </div>
    );
}