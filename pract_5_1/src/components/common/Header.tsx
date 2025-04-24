import { AppBar, Toolbar, Typography, Switch, Box, Button } from "@mui/material";
import { useThemeContext } from "../../features/theme/theme-context";
import { CartIcon } from "@/components/cart/CartIcon";
import { AuthButton } from "../auth/AuthButton";
import { Link } from "react-router-dom";

export function Header() {
    const { themeMode, toggleTheme } = useThemeContext();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Космическая лавка
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Switch
                        checked={themeMode === 'dark'}
                        onChange={toggleTheme}
                        color="secondary"
                    />

                    <CartIcon />
                    
                    <Button 
                        component={Link} 
                        to="/orders" 
                        color="inherit"
                        sx={{ mr: 2 }}
                    >
                        Мои заказы
                    </Button>
                    
                    <AuthButton />
                </Box>
            </Toolbar>
        </AppBar>
    );
}