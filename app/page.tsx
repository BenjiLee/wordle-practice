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
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default HomePage;
