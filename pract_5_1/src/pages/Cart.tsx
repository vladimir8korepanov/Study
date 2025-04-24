import { Box, Typography, Button, Divider, Stack, IconButton, Paper, Container } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cart.slice';
import type { RootState } from '@/stores/redux.store';
import type { CartItem } from '../features/cart/cart.slice';


const imageStyles = { // Стили вынесены как константы
  width: 100, 
  height: 100, 
  objectFit: 'cover' as const, 
  borderRadius: 4
};

export default function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const total = items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ваша корзина для покупок
      </Typography>

      {items.length === 0 ? (
        <Box textAlign="center" py={6}>
          <Typography variant="h6" gutterBottom>
            Корзина пуста
          </Typography>
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            color="primary"
          >
            Звездолеты
          </Button>
        </Box>
      ) : (
        <>
          <Stack spacing={3}>
            {items.map((item) => (
              <Paper key={item.id} elevation={3} sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={3}>
                  <Box
                    component="img"
                    src={item.image} 
                    alt={item.name} 
                    sx={imageStyles}
                  />
                  <Box flexGrow={1}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography color="text.secondary">${item.price.toLocaleString()}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <IconButton 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Remove />
                    </IconButton>
                    <Typography mx={1}>{item.quantity}</Typography>
                    <IconButton 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                  <Typography mx={2} fontWeight="bold">
                    ${(item.price * item.quantity).toLocaleString()}
                  </Typography>
                  <IconButton 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button 
              onClick={() => dispatch(clearCart())} 
              variant="outlined" 
              color="error"
            >
              Очистить корзину
            </Button>
            <Typography variant="h5">
              Итог: <strong>${total.toLocaleString()}</strong>
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              component={Link}
              to="/checkout"
            >
              К оформлению заказа
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}