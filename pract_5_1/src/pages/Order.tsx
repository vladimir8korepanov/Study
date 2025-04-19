import { observer } from 'mobx-react';
import { orderStore } from '../features/orders/order.store';
import { Box, Typography, Card, CardContent, Chip, Button} from '@mui/material';

type OrderStatus = 'обработка' | 'отправлено' | 'доставлено';

const statusColors: Record<OrderStatus, "primary" | "success" | "warning"> = {
  'обработка': "primary",
  'отправлено': "warning",
  'доставлено': "success",
} as const;

const OrdersPage = observer(() => {
    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
      orderStore.updateStatus(orderId, newStatus);
    };
  
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          История заказов
        </Typography>
        {orderStore.orders.length === 0 ? (
          <Typography>У вас пока нет заказов</Typography>
        ) : (
          orderStore.orders.map((order) => (
            <Card key={order.id} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">Заказ #{order.id}</Typography>
                <Typography>Дата: {order.date.toLocaleString()}</Typography>
                <Typography>Имя: {order.customerName}</Typography>
                <Typography>Сумма: ${order.total.toLocaleString()}</Typography>
                
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography>Статус:</Typography>
                  <Chip 
                    label={order.status} 
                    color={statusColors[order.status]} 
                  />
                </Box>
  
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => handleStatusChange(order.id, 'обработка')}
                  >
                    Обработка
                  </Button>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => handleStatusChange(order.id, 'отправлено')}
                  >
                    Отправить
                  </Button>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => handleStatusChange(order.id, 'доставлено')}
                  >
                    Доставлено
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    );
});

export default OrdersPage;
