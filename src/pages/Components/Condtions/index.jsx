import React from "react";

const Conditions = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      {/* Contract Page Header */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Terms and Conditions
      </h1>

      {/* Introduction Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700">Introduction</h2>
        <p className="text-gray-600 mt-2">
          Welcome to [Your Website Name]. By accessing or using our services, you
          agree to comply with and be bound by the following terms and conditions
          ("Terms"). Please read these Terms carefully before using our website or
          services.
        </p>
      </section>

      {/* Terms & Conditions Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700">Terms & Conditions</h2>
        <ul className="list-inside list-disc text-gray-600 mt-2">
          <li>All users must be at least 18 years old to use our services.</li>
          <li>We reserve the right to update or modify these Terms at any time.</li>
          <li>Users are responsible for maintaining the confidentiality of their account.</li>
          <li>Any misuse or unlawful activity on our website may result in termination of access.</li>
        </ul>
      </section>

      {/* Privacy Policy Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700">Privacy Policy</h2>
        <p className="text-gray-600 mt-2">
          Your privacy is important to us. We collect personal data only to provide
          our services and improve user experience. We do not share your information with third
          parties without your consent, except as required by law.
        </p>
        <p className="text-gray-600 mt-2">
          For more details, please read our full Privacy Policy page.
        </p>
      </section>

      {/* Acknowledgment Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700">Acknowledgment and Acceptance</h2>
        <p className="text-gray-600 mt-2">
          By using our services, you acknowledge that you have read and agree to the terms and
          conditions outlined in this contract. If you do not agree, please refrain from using
          our services.
        </p>
      </section>

      {/* Signature Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700">Signature</h2>
        <p className="text-gray-600 mt-2">
          Please acknowledge your acceptance of the contract by clicking the "Accept" button.
        </p>
        <button className="bg-blue-600 text-white py-2 px-4 mt-4 rounded">
          Accept Terms & Conditions
        </button>
      </section>
    </div>
  );
};

export default Conditions;
