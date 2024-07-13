"use client";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/games");
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleClick}>Go To Games Home</button>
    </div>
  );
};

export default HomePage;
