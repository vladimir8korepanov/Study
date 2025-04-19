import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, CardActionArea, Box } from '@mui/material';
import { Spaceship } from '@/api/mockShips';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cart.slice';

interface ShipCardProps {
  ship: Spaceship;
}

export default function ShipCard({ ship }: ShipCardProps) {
  const dispatch = useDispatch();

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(ship));
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
      {/* Только эта часть кликабельна */}
      <CardActionArea component={Link} to={`/ships/${ship.id}`} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={ship.image}
          alt={ship.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {ship.name}
          </Typography>
          <Typography color="text.secondary">
            Двигатель {ship.engine}
          </Typography>
          <Typography paragraph sx={{ mt: 1 }}>
            {ship.description}
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* Кнопка вне кликабельной части */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          disabled={ship.status !== 'available'}
          onClick={handleBuy}
        >
          {ship.status === 'available' ? `Купить за $${ship.price}` : 'Нет в наличии'}
        </Button>
      </Box>
    </Card>
  );
}
