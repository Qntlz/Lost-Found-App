"use client";

import { useState } from "react";
import { db } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreateAnnouncement() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(""); // For success/error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !message) {
      setFeedback("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const announcementsRef = collection(db, "announcements");
      await addDoc(announcementsRef, {
        title,
        message,
        createdAt: serverTimestamp(),
      });

      setFeedback("Announcement posted successfully!");

      // Clear fields
      setTitle("");
      setMessage("");

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/home");
      }, 2000);

    } catch (error) {
      console.error("Error posting announcement:", error);
      setFeedback("Failed to post announcement. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mx-6 gap-4">
      <div className="text-red-500 text-2xl font-medium lg:mt-3">
        <span>Create Announcement</span>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter announcement title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Message Textarea */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-lg font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Enter announcement details"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 disabled:bg-gray-400 transition duration-200"
            >
              {loading ? "Posting..." : "Post Announcement"}
            </button>
          </div>
        </form>
      </div>

      {/* Feedback Message */}
      <div>
        {feedback && (
          <p
            className={`mt-4 text-sm text-center ${
              feedback.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
}
