import { useEffect, useRef, useState } from "react";

export function ScrollTiltGrid() {
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxTilt = 8;
      const tiltValue = Math.min(scrollY / 200, 1) * maxTilt;
      setTilt(tiltValue);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="grid-pattern fixed inset-0 pointer-events-none transition-transform duration-300"
      style={{
        transform: `perspective(1000px) rotateX(${tilt}deg)`,
        transformOrigin: "center top",
      }}
    />
  );
}
