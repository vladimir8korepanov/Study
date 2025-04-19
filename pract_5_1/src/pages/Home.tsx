import { useEffect } from 'react';
import { Grid, GridProps, CircularProgress, Typography, Alert } from '@mui/material';
import ShipCard from '@/components/products/ShipCard';
import { useProductStore } from '../features/products/product.store';
import type { Spaceship } from '@/api/mockShips';



export default function HomePage() {
  const { ships, loading, error, fetchShips } = useProductStore();
  
  useEffect(() => {
    if (ships.length === 0) fetchShips();
  }, [fetchShips, ships.length]);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  
  if (error) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      Неудалось найти звездолет: {error}
    </Alert>
  );

  if (ships.length === 0) return (
    <Typography variant="h6" sx={{ mt: 2 }}>
      Свободных звездолетов нет!
    </Typography>
  );
  
  return (
    <Grid container spacing={3}>
      <Typography variant="h4" gutterBottom>
        Каталог космических кораблей
      </Typography>
      
      <Grid container spacing={3}>
        {ships.map((ship: Spaceship) => (
          <Grid item 
            key={ship.id} 
            xs={12} 
            sm={6} 
            md={4} 
            component="div" {...({} as GridProps)}
          >
            <ShipCard ship={ship} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}