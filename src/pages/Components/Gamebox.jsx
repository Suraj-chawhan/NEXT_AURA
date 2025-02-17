import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
const MainContent = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    // GSAP animations for cards
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 50, scale: 0.9 }, // Start state (invisible, slightly lower, and smaller)
      {
        opacity: 1,
        y: 0,
        scale: 1, // End state (visible, in place, and normal size)
        duration: 1.2,
        stagger: 0.3, // Delay each card's animation by 0.3 seconds
        ease: "power4.out", // Smooth easing function
      }
    );

    // Adding hover effect on the cards
    gsap.utils.toArray(".card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
          duration: 0.3,
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
        });
      });
    });
  }, []);

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
      image: "/Images/typingreplace.png",
      title: "Animals ",
      content: "Check your typing skills in animals.",
      link: "/Typing",
    },
  ];

  const router = useRouter();

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-12 px-32 py-20 "
    >
      {cardData.map((card) => (
        <div
          key={card.id}
          className="card bg-white shadow-lg overflow-hidden p-4 cursor-pointer border-black border-2 rounded-xl"
        >
          <Image
            src={card.image}
            alt={card.title}
            width={10}
            height={10}
            className="w-full h-80 object-cover rounded-md"
          />
          <h3 className="text-lg font-semibold mt-2 text-black">
            {card.title}
          </h3>
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
    </div>
  );
}
