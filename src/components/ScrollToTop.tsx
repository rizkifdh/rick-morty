import { useEffect, useState } from "react";
import { BiArrowFromBottom } from "react-icons/bi";
import { GiRayGun } from "react-icons/gi";
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="sticky bottom-24 justify-end pr-5 flex z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={`${
          isVisible ? "opacity-100" : "opacity-0"
        } bg-primary text-white rounded-full p-2`}
      >
        <GiRayGun className="h-10 w-10 -scale-x-100" aria-hidden="true" />
      </button>
    </div>
  );
}
