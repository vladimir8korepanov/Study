import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Chip, Stack, Divider } from '@mui/material';
import { useProductStore } from '../features/products/product.store';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cart.slice';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedShip, selectShip } = useProductStore();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (id) selectShip(id);
  }, [id, selectShip]);

  if (!selectedShip) return <Typography>Загрузка</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <Typography variant="h3" gutterBottom>
        {selectedShip.name}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <Box
            component="img"
            src={selectedShip.image} 
            alt={selectedShip.name}
            style={{ width: '100%', borderRadius: 8 }}
          />
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            ${selectedShip.price.toLocaleString()}
          </Typography>
          
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip label={`Crew: ${selectedShip.crew}`} />
            <Chip label={`Engine: ${selectedShip.engine}`} />
            <Chip 
              label={selectedShip.status} 
              color={selectedShip.status === 'available' ? 'success' : 'warning'}
            />
          </Stack>
          
          <Typography paragraph>
            {selectedShip.description}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Button 
            variant="contained" 
            size="large"
            disabled={selectedShip.status !== 'available'}
            sx={{ width: '100%' }}
            onClick={() => dispatch(addToCart(selectedShip))}
          >
            {selectedShip.status === 'available' ? 'В корзину' : 'Нет в наличи'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}