import { Box, Container } from '@mui/material';
import { Header } from '@/components/common/Header';
import { Outlet } from 'react-router-dom'; // <-- добавь

export function Layout() {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container component="main" sx={{ py: 3, flex: 1 }}>
                <Outlet /> {/* отрисует текущую страницу */}
            </Container>
            <Box component="footer" sx={{ py: 2, bgcolor: 'background.paper' }}>
                {/* футер */}
            </Box>
        </Box>
    );
}
