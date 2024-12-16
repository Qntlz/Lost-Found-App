"use client"

import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import LostItemForm from "./lostItem-form";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";

export default function MakePost() {

    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    const handlePostButton = () => {
        if (formRef.current) {
            formRef.current.requestSubmit(); // Triggers form submission
            router.push("/home"); // Redirect after submission
        }
    };


    return (
        <div>
            {/* Header */}
            <div className="flex flex-row justify-between items-center mx-6 p-5 pl-0 lg:pt-2">
                <div className="flex gap-4 items-center lg:ml-4">
                    {/* Back Icon */}
                    <div className="block lg:hidden">
                        <Link href={'/home'}>
                            <ArrowLeftIcon className="w-5" />
                        </Link>
                    </div>
                    {/* Header Text */}
                    <span className="text-2xl font-normal text-red-500">Report Lost Item</span>
                </div>

                {/* Button to Submit the Form */}
                <Button
                    type="button"
                    onClick={handlePostButton}
                    className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 
                               font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-red-600"
                >
                    POST
                </Button>
            </div>

            {/* Contents */}
            <div className="mx-5 p-5">
                {/* Post Form */}
                <div>
                    <LostItemForm formRef={formRef} />
                </div>
            </div>
        </div>

    );
}