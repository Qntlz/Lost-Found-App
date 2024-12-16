"use client"

import Link from "next/link";
import { useState } from "react";
import { PencilSquareIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Feed } from "@/app/lib/definitions";


export default function FeedHeader({
  showFilters, selectedStatus,
  selectedBuilding, selectedCampus,
  setSelectedStatus, setSelectedCampus,
  setSelectedBuilding, setShowFilters
}: Feed) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Filter & Add Item Buttons */}
      <div className="flex mx-5 w-full items-center justify-between">
        {/* Funnel Icon */}
        <div className="flex text-gray-500">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="p-2 pl-0 flex items-center"
          >
            <AdjustmentsHorizontalIcon className="w-8" />
          </button>
        </div>
        <div className="text-red-500 lg:hidden">
          <Link href={'/post/make'} className="flex font-normal text-sm text-nowrap items-center">
            < PencilSquareIcon className="w-8"/>
          </Link>
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mx-5">
          <div className="flex gap-2">

            <select
              onChange={(e) => setSelectedStatus(e.target.value)}
              value={selectedStatus}
              className="p-2 text-xs sm:text-base bg-transparent border border-red-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-transparent"
            >
              <option value="Missing">Missing</option>
              <option value="Found">Found</option>
              <option value="All">All Status</option>
            </select>

            <select
              onChange={(e) => setSelectedCampus(e.target.value)}
              value={selectedCampus}
              className="p-2 text-xs sm:text-base bg-transparent border border-red-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-transparent"

            >
              <option value="All">All Campus</option>
              <option value="Main">Main</option>
              <option value="Talamban">Talamban</option>
              {/* Add more campuses as needed */}
            </select>
            <select
              onChange={(e) => setSelectedBuilding(e.target.value)}
              value={selectedBuilding}
              className="p-2 text-xs sm:text-base bg-transparent border border-red-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-transparent"
            >
              <option value="All">All Buildings</option>
              <option value="Bunzell">Bunzell</option>
              <option value="Chapel">Chapel</option>
              <option value="Dormitory">Dormitory</option>
              <option value="MR">MR</option>
              <option value="PE">PE</option>
              <option value="RH">RH</option>
              <option value="SAFAD">SAFAD</option>
              <option value="SMED">SMED</option>
              <option value="Wing 1">Wing 1</option>
              <option value="Wing 2">Wing 2</option>
              <option value="Wing 3">Wing 3</option>
              {/* Add more buildings as needed */}
            </select>

          </div>
        </div>
      )}

    </div>
  );
}