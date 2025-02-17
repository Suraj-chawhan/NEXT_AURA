import React from "react";
import { useRouter } from "next/navigation";

const IndexPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Our Page
        </h1>
        <p className="text-gray-600 mt-4">
          This page serves as an introduction to our platform. Here, you can
          find all the essential information about our services, features, and
          how we can help you.
        </p>

        <ul className="text-gray-700 text-left mt-4 space-y-2">
          <li>✅ High-quality content</li>
          <li>✅ User-friendly experience</li>
          <li>✅ Fast and responsive design</li>
          <li>✅ Easy navigation</li>
        </ul>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
