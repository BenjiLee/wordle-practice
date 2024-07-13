"use client";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/games/wordle");
  };

  return (
    <div>
      <h1>Games Gome Page</h1>
      <button onClick={handleClick}>Play Wordle</button>
    </div>
  );
};

export default HomePage;
