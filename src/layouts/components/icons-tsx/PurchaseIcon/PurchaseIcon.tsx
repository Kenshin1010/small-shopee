import ReceiptIcon from '@mui/icons-material/Receipt';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PurchaseIcon() {
  const navigate = useNavigate();
  return (
    <div>
      <Tooltip disableFocusListener arrow title="Purchased History">
        <IconButton
          onClick={() => {
            navigate(`/purchase`);
          }}
          sx={{ marginRight: '48px', cursor: 'pointer' }}
        >
          <ReceiptIcon sx={{ fontSize: '32px' }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default PurchaseIcon;
