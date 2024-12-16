import Link from "next/link"
import NavLinks from "./nav-links";
import UsernameDisplay from "@/app/lib/actions";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function SideNavXL() {
    return (

        <div className="hidden lg:flex flex-col ml-8 mt-2">
            <span className="font-medium text-2xl text-red-500">Dashboard</span>
            <ul className="mt-4 mb-8">
                <li>
                    <Link href={'/home'}><UsernameDisplay /></Link>
                </li>
                <li>
                    <Link href={'/home'}>BSCS - 2</Link>
                </li>
                <Link href={'/post/make'}>
                    <div className="hidden lg:flex p-2 mt-3 gap-2 text-red-500 border transition ease-in-out delay-150 border-red-500 rounded-xl
                                hover:bg-red-500 hover:text-white items-center xl:justify-center">
                        <div>

                            <PencilSquareIcon className="w-6" />

                        </div>
                        <div className="mt-1">
                            <span className="hover:underline">New Post</span>
                        </div>
                    </div>
                </Link>
            </ul>
            < NavLinks />
        </div>
    );
}