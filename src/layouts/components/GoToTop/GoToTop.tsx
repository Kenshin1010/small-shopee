import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

function GoToTop() {
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY >= 200) {
        setShowGoToTop(true);
        console.log("set state");
      } else {
        setShowGoToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    console.log("addEventListener");

    // Cleanup function
    return () => {
      console.log("Unmounting...");
      window.removeEventListener("scroll", handleScroll);
      console.log("removeEventListener");
    };
  });

  return (
    <Box>
      {showGoToTop && (
        <Button
          sx={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
          }}
          onClick={() => window.scrollTo(0, 0)}
        >
          Go to top
        </Button>
      )}
    </Box>
  );
}

export default GoToTop;
