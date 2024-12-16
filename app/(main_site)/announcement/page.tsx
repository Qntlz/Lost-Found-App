"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import CreateAnnouncement from "@/app/ui/announcement/make-announcement";
import Announcements from "@/app/ui/home/announcement";

export default function ShowAnnouncement() {
  const [userType, setUserType] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const currentUser  = auth.currentUser; 

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        if (currentUser?.uid) {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserType(userSnap.data().userType);
          } else {
            console.error("User document does not exist.");
          }
        }
      } catch (error) {
        console.error("Error fetching userType:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserType();
  }, [currentUser]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-10 lg:mx-10">
      <div className="lg:w-[80%]">
        <Announcements />
      </div>

      {/* Conditionally render CreateAnnouncement only for admins */}
      {userType === 0 && <CreateAnnouncement />}
    </div>
  );
}
