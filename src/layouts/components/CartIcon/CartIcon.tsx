import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge, { BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    bgcolor: "#ee4d2d",
  },
}));
function CartIcon() {
  const navigate = useNavigate();
  const { totalUniqueItems } = useCart();
  return (
    <IconButton
      aria-label="cart"
      onClick={() => {
        navigate(`/cart`);
      }}
      sx={{ marginRight: "48px" }}
    >
      <StyledBadge badgeContent={totalUniqueItems} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}

export default CartIcon;
