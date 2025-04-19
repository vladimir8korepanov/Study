import { useState } from "react";
import { Typography, Button, Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/stores/redux.store";
import { orderStore } from "../features/orders/order.store";
import { clearCart } from "../features/cart/cart.slice";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
    const [name, setName] = useState('');
    const { items } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        orderStore.createOrder(items, name || 'Гость');
        dispatch(clearCart());
        navigate('/orders');
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', py: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Оформить покупку
            </Typography>
            
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    placeholder="Юрий Гагарин"
                />
                <Box sx={{ mt: 4 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={items.length === 0}
                    >
                        Подтвердить заказ
                    </Button>
                </Box>
            </form>
            <Button
                component={Link}
                to="/cart"
                variant="outlined"
                sx={{ mt:2 }}
            >
                 Вернутсья в корзину
            </Button>
        </Box>
    );
}