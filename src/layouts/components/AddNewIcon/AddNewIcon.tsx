import PostAddIcon from "@mui/icons-material/PostAdd";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddNewIcon() {
  const navigate = useNavigate();
  return (
    <div>
      <Tooltip arrow title="Add New Product">
        <IconButton
          onClick={() => {
            navigate(`/addnew`);
          }}
          sx={{ margin: "0 48px" }}
        >
          <PostAddIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default AddNewIcon;