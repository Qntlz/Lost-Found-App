"use client"

import Image from "next/image";
import { auth, db } from '@/firebaseConfig';
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

type DisplayProfileProps = {
  size?: number;
};

export function DisplayProfile({ size = 80 }: DisplayProfileProps) { // Default to 100 if not passed
  const [avatarUrl, setAvatarUrl] = useState("/logo.svg");

  // console.log("Width passed to DisplayProfile:", size); // Debug log

  return (
    <div className="relative">
      <div className="flex items-center cursor-pointer">
        <div>
          <Image
            src={avatarUrl}
            alt="User Avatar"
            width={size}
            height={size}
            className="p-2 rounded-full outline outline-2 outline-red-500 outline-offset-1 xl:p-0"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export function EmailDisplay() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserNameFromFirestore = async (uid: string) => {
      try {
        const userDocRef = doc(db, "users", uid); // Reference to the user's document in Firestore
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setEmail(userData.email || null); // Update the username from Firestore
        } else {
          console.warn("No user document found for UID:", uid);
          setEmail(null);
        }
      } catch (error) {
        console.error("Error fetching username from Firestore:", error);
        setEmail(null);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserNameFromFirestore(user.uid); // Fetch username from Firestore using UID
      } else {
        setEmail(null); // Reset if no user is logged in
      }
    });

    return unsubscribe; // Cleanup auth listener on component unmount
  }, []);

  return <div>{email || ""}</div>; // Show "Guest" if username is not available
}

export default function UsernameDisplay() {
  const [userName, setUserName] = useState<string | null>(null);
  const [uid, setUID] = useState<string | null>(null);

  const fetchUserNameFromFirestore = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid); // Reference to the user's document in Firestore
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserName(userData.name || null); // Update the username from Firestore
      } else {
        console.warn("No user document found for UID:", uid);
        setUserName(null);
      }
    } catch (error) {
      console.error("Error fetching username from Firestore:", error);
      setUserName(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUID(user.uid);
        fetchUserNameFromFirestore(user.uid); // Initial fetch
      } else {
        setUID(null);
        setUserName(null);
      }
    });

    return () => unsubscribe(); // Cleanup auth listener on component unmount
  }, []);

  useEffect(() => {
    if (uid) {
      const interval = setInterval(() => {
        fetchUserNameFromFirestore(uid); // Poll Firestore every 10 seconds
      }, 10000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [uid]);

  return <div>{userName || "Guest"}</div>; // Show "Guest" if username is not available
}

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
      try {
          await signOut(auth); // Log out the user
          console.log("User signed out successfully.");
          router.push('/'); // Redirect to the landing page
      } catch (error) {
          console.error("Error signing out:", error);
      }
  };

  return (
      <div className="relative">
          <button
              onClick={handleSignOut}
          >
              Sign Out
          </button>
      </div>
  );
}