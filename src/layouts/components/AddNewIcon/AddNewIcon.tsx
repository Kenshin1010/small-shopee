import PostAddIcon from "@mui/icons-material/PostAdd";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddNewIcon() {
  const navigate = useNavigate();
  return (
    <div>
      <IconButton
        onClick={() => {
          navigate(`/addnew`);
        }}
        sx={{ marginRight: "48px", cursor: "pointer" }}
      >
        <PostAddIcon />
      </IconButton>
    </div>
  );
}

export default AddNewIcon;
