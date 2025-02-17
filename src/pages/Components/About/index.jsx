import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">About Our Services</h2>
        <p className="text-xl text-gray-600 mb-12">We provide a variety of interactive tools to enhance learning and engagement. Explore each of our services below!</p>

        <div className="space-y-12">
          {/* Quiz Game Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">1. Quiz Game</h3>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Description:</strong> The <strong>Quiz Game</strong> is an interactive learning tool where users answer multiple-choice questions to test their knowledge. It often features different categories or subjects and provides immediate feedback on the answers. This type of game can be used to assess understanding, improve memory retention, and even offer rewards or progress tracking.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Advantages:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Improves Knowledge: Reinforces learning by challenging the user with a variety of questions.</li>
              <li>Progress Tracking: Tracks progress over time, allowing the user to see improvement.</li>
              <li>Engaging and Fun: Keeps users engaged through interactive and gamified quizzes.</li>
              <li>Customizable Content: Can be easily adapted for different subjects and educational levels.</li>
              <li>Instant Feedback: Provides users with immediate feedback, reinforcing correct answers and explaining mistakes.</li>
            </ul>
          </div>

          {/* Flipcard Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">2. Flipcard</h3>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Description:</strong> The <strong>Flipcard</strong> game is a simple yet effective way to help users learn through flashcards. The game typically involves a card with a question or term on one side and the answer or explanation on the other. Users “flip” the card to reveal the answer, enhancing memory recall and understanding.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Advantages:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Active Recall: Forces users to remember information actively, which is proven to strengthen memory.</li>
              <li>Visual Learning: Often uses images and text, making it ideal for visual learners.</li>
              <li>Portable: Can be used in many formats (physical cards, digital apps), making learning flexible.</li>
              <li>Gamified Learning: Adds a fun and competitive element by tracking progress and timing.</li>
              <li>Efficient Revision: Great for quick reviews before exams or to reinforce knowledge.</li>
            </ul>
          </div>

          {/* Chatbot Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">3. Chatbot</h3>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Description:</strong> The <strong>Chatbot</strong> is an AI-powered interactive tool designed to answer questions, clarify doubts, and guide users through a learning process. It simulates a conversation with a human and can be available 24/7 to provide real-time support. The chatbot may be trained on specific knowledge areas, making it useful for a variety of educational contexts.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Advantages:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Instant Assistance: Provides instant answers to questions at any time.</li>
              <li>24/7 Availability: Accessible anytime, which is helpful for users in different time zones or those needing support outside of regular hours.</li>
              <li>Personalized Experience: Can adapt to the user's needs, offering tailored recommendations and resources.</li>
              <li>Scalable Support: Can handle multiple users simultaneously, making it ideal for large audiences.</li>
              <li>Learning Companion: Offers continuous feedback and learning opportunities, making it a valuable tool for self-paced learners.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
