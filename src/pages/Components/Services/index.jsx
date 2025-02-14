import React from 'react';

const ServicesPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Services</h2>
        <p className="text-xl text-gray-600 mb-12">We offer engaging and interactive services to help you learn and have fun!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quiz Game Service */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Game</h3>
            <p className="text-gray-600 mb-4">Test your knowledge with our exciting quiz games. Multiple categories and levels of difficulty to challenge you!</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
              Learn More
            </button>
          </div>

          {/* Flip Card Game Service */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Flip Card Game</h3>
            <p className="text-gray-600 mb-4">Enjoy our flip card game that will test your memory skills while having fun! Flip, match, and win!</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
              Learn More
            </button>
          </div>

          {/* Chatbot Service */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Chatbot</h3>
            <p className="text-gray-600 mb-4">Interact with our smart chatbot. Get answers to your questions instantly and enjoy personalized conversations!</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
