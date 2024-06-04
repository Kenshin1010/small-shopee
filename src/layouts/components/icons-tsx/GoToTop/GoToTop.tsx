import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import { Box, IconButton, Tooltip } from "@mui/material";
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
        <Tooltip disableFocusListener arrow title="Cart">
          <IconButton
            aria-label="to-top"
            sx={{ position: "fixed", right: "20px", bottom: "20px" }}
            onClick={() => window.scrollTo(0, 0)}
          >
            <VerticalAlignTopIcon sx={{ fontSize: "32px" }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default GoToTop;
