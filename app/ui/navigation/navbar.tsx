"use client";

import { useState } from "react";
import SideNav from "./Sidenav-Drawer";
import {
  MagnifyingGlassIcon,
  BellAlertIcon,
  Bars3Icon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import ProfileSideNav from "./Profile-Sidenav";
import { DisplayProfile } from "@/app/lib/actions";
import { useSearch } from "@/app/lib/SearchContext";

export default function NavBar() {

  const [showNav, setShowNav] = useState(false);
  const [showProfileNav, setShowProfileNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { updateSearch } = useSearch();

  return (
    <div>
      <header>

        <div className="flex flex-wrap my-5 md:flex-nowrap">

          {/* Brandname & Mobile Sidenav */}
          <div className="flex gap-2 mx-5">
            <div>
              <button onClick={() => setShowNav(!showNav)}>
                <Bars3Icon className="lg:hidden w-8 text-gray-500 cursor-pointer" />
              </button>
            </div>
            <div>
              <div className="flex">
                <div className="flex flex-row text-2xl text-gray-500 gap-2">
                  <span className="text-red-500">LOST</span>
                  <span>&</span>
                  <span className="text-red-500">FOUND</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search, Notification & Profile */}
          <div className="flex flex-grow justify-end gap-5 pr-5 lg:pr-3 md:order-3">

            {/* Search Icon */}
            <div className="mt-1">
              <button onClick={() => setShowSearch(!showSearch)}>
                <MagnifyingGlassIcon className="w-7 text-red-500 cursor-pointer" />
              </button>
            </div>

            {/* Notification Icon */}
            <div className="mt-1">
              <button>
                <BellAlertIcon className="w-7 text-red-500 transition duration-0 hover:duration-150 hover:scale-110" />
              </button>
            </div>

            {/* Profile Icon */}
            <div className="hidden lg:flex w-5 mx-2">
              {/* Add Avatar Here */}
              <button onClick={() => setShowProfileNav(!showProfileNav)}>
                < DisplayProfile />
              </button>
            </div>

          </div>

          {/* Search Bar */}
          <div
            className={`transition-all duration-300 flex items-center w-full md:w-[60%] mx-5 ${showSearch ? "opacity-100 max-h-20 order-3 md:order-2" : "opacity-0 max-h-0"
              } overflow-hidden xl:pl-10`}
          >
            <input
              type="text"
              placeholder="Search by tags (e.g., red, aquaflask)"
              className="mt-1 p-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
              onChange={(e) => updateSearch(e.target.value)}
            />
          </div>

        </div>
        <SideNav show={showNav} closeNav={() => setShowNav(!showNav)} />
        <ProfileSideNav show={showProfileNav} closeNav={() => setShowProfileNav(!showProfileNav)} />
      </header>
    </div>
  );
}
