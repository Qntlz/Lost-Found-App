"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Announcement } from "@/app/lib/definitions";

export default function Announcements() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch announcements from Firestore
    const fetchAnnouncements = async () => {
        try {
            const announcementsRef = collection(db, "announcements");
            const q = query(announcementsRef, orderBy("createdAt", "desc")); // Order by most recent
            const snapshot = await getDocs(q);

            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Announcement[];

            setAnnouncements(data);
        } catch (err) {
            console.error("Error fetching announcements:", err);
            setError("Failed to load announcements.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    return (
        <div className="flex flex-col gap-3 lg:w-full mx-5">
            {/* Header */}
            <div className="mt-1">
                <span className="text-2xl text-red-500">Announcements</span>
            </div>

            {/* States */}
            <div>
                {/* Loading State */}
                {loading && <p className="text-gray-500 text-center">Loading...</p>}

                {/* Error State */}
                {error && <p className="text-red-500 text-center">{error}</p>}
            </div>

            {/* Announcements List */}
            <div>
                {announcements.length > 0 ? (
                    <div className="space-y-6">
                        {announcements.map((announcement) => (
                            <div
                                key={announcement.id}
                                className="p-4 rounded-lg shadow-sm border border-gray-500"
                            >
                                <h3 className="text-lg font-medium text-red-500">
                                    {announcement.title}
                                </h3>
                                <p className="text-gray-700 mt-2">{announcement.message}</p>
                                <p className="text-sm text-gray-500 mt-4 text-right">
                                    {announcement.createdAt
                                        ? new Date(announcement.createdAt.seconds * 1000).toLocaleString()
                                        : "Unknown date"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && <p className="text-gray-500 text-center">No announcements found.</p>
                )}
            </div>

        </div>
    );
}
