import lottie from "lottie-web";
import { useEffect } from "react";

export default function DogWalking() {
  useEffect(() => {
    const el = document.querySelector(".animation_");

    const instance = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      autoplay: true,
      path: "/dog.json",
    });

    return () => instance.destroy();
  }, []);

  return (
    <div className="w-60 m-auto -mb-8 -mt-8">
      <div className="animation_" />
    </div>
  );
}
