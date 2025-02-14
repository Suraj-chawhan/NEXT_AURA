import React, { useState } from 'react';

function FeedbackForm() {
  const [feedback, setFeedback] = useState({
    experience: '',
    navigation: '',
    foundInfo: '',
    design: '',
    speed: '',
    deviceAccess: '',
    likeMost: '',
    improvements: '',
    contentRating: '',
    clarity: '',
    recommend: '',
    additionalComments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    // You can send the data to a server here.
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-zinc-800 shadow-lg rounded-lg text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Website Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">How would you rate your overall experience on our website?</label>
            <select
              name="experience"
              value={feedback.experience}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="poor">Poor</option>
              <option value="veryPoor">Very Poor</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">How easy was it to navigate our website?</label>
            <select
              name="navigation"
              value={feedback.navigation}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="veryEasy">Very Easy</option>
              <option value="easy">Easy</option>
              <option value="neutral">Neutral</option>
              <option value="difficult">Difficult</option>
              <option value="veryDifficult">Very Difficult</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">What did you like the most about our website?</label>
            <textarea
              name="likeMost"
              value={feedback.likeMost}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold">What improvements or changes would you suggest?</label>
            <textarea
              name="improvements"
              value={feedback.improvements}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold">How would you rate the design and aesthetics of our website?</label>
            <select
              name="design"
              value={feedback.design}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="poor">Poor</option>
              <option value="veryPoor">Very Poor</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">How fast did the website load for you?</label>
            <select
              name="speed"
              value={feedback.speed}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="veryFast">Very Fast</option>
              <option value="fast">Fast</option>
              <option value="average">Average</option>
              <option value="slow">Slow</option>
              <option value="verySlow">Very Slow</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Would you recommend our website to others?</label>
            <select
              name="recommend"
              value={feedback.recommend}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="definitely">Definitely</option>
              <option value="probably">Probably</option>
              <option value="notSure">Not Sure</option>
              <option value="probablyNot">Probably Not</option>
              <option value="definitelyNot">Definitely Not</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
