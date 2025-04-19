import { useAtomValue, useSetAtom } from 'jotai';
import { Button, Menu, MenuItem } from '@mui/material';
import { userAtom, loginAtom, logoutAtom } from '../../features/auth/auth.store';
import { useState } from 'react';

export function AuthButton() {
    const user = useAtomValue(userAtom);
    const login = useSetAtom(loginAtom);
    const logout = useSetAtom(logoutAtom);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleLogin = () => {
        login('Юрий Гагарин');
        setAnchorEl(null);
    };

    return (
        <> 
            <Button
                color='inherit'
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {user.name}
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {user.isGuest ? (
                    <MenuItem onClick={handleLogin}>
                        Войти как Покупатель
                    </MenuItem>
                ) : (
                    <MenuItem onClick={logout}>
                        Выйти
                    </MenuItem>
                )}
            </Menu>
        </>
    );
}