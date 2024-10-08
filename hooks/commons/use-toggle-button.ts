import { useState } from "react";

export default function useToggleButton() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return {
    isToggled,
    handleToggle,
  };
}
