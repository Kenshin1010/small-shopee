import ReceiptIcon from "@mui/icons-material/Receipt";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PurchaseIcon() {
  const navigate = useNavigate();
  return (
    <div>
      <IconButton
        onClick={() => {
          navigate(`/purchase`);
        }}
        sx={{ marginRight: "48px", cursor: "pointer" }}
      >
        <ReceiptIcon />
      </IconButton>
    </div>
  );
}

export default PurchaseIcon;
