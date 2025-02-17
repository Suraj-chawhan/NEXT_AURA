import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MainContent = () => {
  const gridRef = useRef(null);
  const router = useRouter();

  // Add card data content
  const cardData = [
    {
      id: 1,
      image: "/Images/flipcardreplace.jpg",
      title: "Flip Card Game",
      content: "Test your memory with this fun flip card game.",
      link: "/Flip",
    },
    {
      id: 2,
      image: "/Images/quizreplace.jpg",
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
    {
      id: 4,
      image: "/Images/typingreplace.png",
      title: "Typing Test",
      content: "Check your typing skills and improve.",
      link: "/Typing",
    },
    {
      id: 5,
      image: "/Images/animal.png",
      title: "Animals ",
      content: "Check your typing skills in animals.",
      link: "/Animalimg",
    },
    {
      id: 6,
      image: "/Images/dora.png",
      title: "Run With Dora ",
      content: "Run with Dora",
      link: "/Dora",
    },
    {
      id: 7,
      image: "/Images/twozero.png",
      title: "Two four Eight",
      content: "Two four eight",
      link: "/twozero",
    },
    {
      id: 8,
      image: "/Images/guessword.png",
      title: "Guess word",
      content: "Guess the correct word",
      link: "/guessword",
    },
  ];

  useEffect(() => {
    // Add null check for gridRef
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "power4.out",
        }
      );

      gsap.utils.toArray(".card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
            duration: 0.3,
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
          });
        });
      });
    }
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 md:px-16 lg:px-18 py-14"
    >
      {cardData.map((card) => (
        <div
          key={card.id}
          className="card group bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={card.image}
              alt={card.title}
              width={10}
              height={10}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{card.content}</p>
            <button
              onClick={() => router.push(card.link)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium 
                       hover:from-blue-600 hover:to-blue-700 transition-colors duration-300 shadow-sm"
            >
              Play Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/Images/logo.jpg"
              width={10}
              height={10}
              className="w-12 h-12 rounded-full border-2 border-white"
              alt="Logo"
            />
            <span className="ml-3 text-white text-2xl font-bold">GameHub</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/about"
              className="text-white hover:text-blue-200 transition-colors duration-300 font-medium"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-white hover:text-blue-200 transition-colors duration-300 font-medium"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/signin"
              className="text-white hover:text-blue-200 transition-colors duration-300 font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 font-medium"
            >
              Sign Up
            </Link>
          </div>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="/about"
              className="block text-white px-4 py-2 hover:bg-blue-500/20 rounded-lg"
            >
              About
            </Link>
            <Link
              href="/services"
              className="block text-white px-4 py-2 hover:bg-blue-500/20 rounded-lg"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="block text-white px-4 py-2 hover:bg-blue-500/20 rounded-lg"
            >
              Contact
            </Link>
            <Link
              href="/feedback"
              className="block text-white px-4 py-2 hover:bg-blue-500/20 rounded-lg"
            >
              Feedback
            </Link>
            <div className="border-t border-white/20 pt-4 mt-4 space-y-4">
              <Link
                href="/signin"
                className="block text-white px-4 py-2 hover:bg-blue-500/20 rounded-lg"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block text-white px-4 py-2 hover:bg-blue-500/20 rounded-lg"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default function App() {
  return (
    <div className="flex flex-col gap-2">
      <Navbar />
      <MainContent />
      <footer className="self-center">
        All right reserve by suraj chawhan
      </footer>
    </div>
  );
}
