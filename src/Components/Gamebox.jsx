import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Navbar = () => (
  <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex justify-between items-center shadow-md">
    <div className="text-xl font-bold">MyLogo</div>
    <div className="space-x-4">
      <button className="bg-white text-blue-600 px-4 py-2 rounded shadow">
        Login
      </button>
      <button className="bg-white text-purple-600 px-4 py-2 rounded shadow">
        Sign Up
      </button>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-800 to-black text-white p-6 text-center mt-10 shadow-md">
    <div className="flex justify-center space-x-6">
      <a href="#" className="hover:underline">
        About
      </a>
      <a href="#" className="hover:underline">
        Disclaimer
      </a>
      <a href="#" className="hover:underline">
        Contact
      </a>
    </div>
    <p className="mt-4">&copy; 2025 My Website. All rights reserved.</p>
  </footer>
);

const MainContent = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3 }
    );
  }, []);

  const cardData = [
    {
      id: 1,
      image: "/Images/flipcard.jpg",
      title: "Flip Card Game",
      content: "Test your memory with this fun flip card game.",
      link: "/Flip",
    },
    {
      id: 2,
      image: "/Images/quizgame.jpg",
      title: "Quiz Game",
      content: "Challenge yourself with our interactive quizzes.",
      link: "/Quiz",
    },
    {
      id: 3,
      image: "/Images/chatbot.jpg",
      title: "AI Assistant",
      content: "Talk to our smart chatbot for assistance.",
      link: "/Assistant",
    },
  ];

  const router = useRouter();

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
      {cardData.map((card) => (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 cursor-pointer">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-80 object-cover rounded-md"
          />
          <h3 className="text-lg font-semibold mt-2">{card.title}</h3>
          <p className="text-gray-600">{card.content}</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            onClick={() => router.push(`/${card.link}`)}
          >
            Play Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainContent />
      <Footer />
    </div>
  );
}
