import { Badge, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/redux.store';
import { Link } from 'react-router-dom';

export function CartIcon() {
    const itemCount = useSelector((state: RootState) => state.cart.items.reduce((sum: number, item) => sum + item.quantity, 0));
  

    return (
        <IconButton component={Link} to="/cart" color="inherit">
            <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
            </Badge>
        </IconButton>
    );
}