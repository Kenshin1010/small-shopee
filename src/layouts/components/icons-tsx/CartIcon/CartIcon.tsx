import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import useCart from '../../../../hooks/useCart';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    bgcolor: '#101010',
  },
}));
function CartIcon() {
  const navigate = useNavigate();
  const { totalUniqueItems } = useCart();
  return (
    <>
      <Tooltip disableFocusListener arrow title="Cart">
        <IconButton
          aria-label="cart"
          onClick={() => {
            navigate(`/cart`);
          }}
          sx={{ marginRight: '48px' }}
        >
          <StyledBadge badgeContent={totalUniqueItems} color={'primary'}>
            <ShoppingCartIcon
              sx={{
                fontSize: '32px',
              }}
            />
          </StyledBadge>
        </IconButton>
      </Tooltip>
    </>
  );
}

export default CartIcon;
