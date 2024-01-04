import lottie from "lottie-web";
import { useEffect } from "react";

export default function Confetti() {
  useEffect(() => {
    const el = document.querySelector(".animationn_");
    const instance = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      autoplay: true,
      loop: false,
      path: "/confetti.json",
    });

    return () => instance.destroy();
  }, []);

  return (
    <div className="fixed bottom-0 w-full left-0">
      <div className="animationn_" />
    </div>
  );
}
