import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/stores/redux.store';
import { theme} from '../features/theme/index';
import { Provider as JotaiProvider } from 'jotai';

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <JotaiProvider>    
            <ReduxProvider store={store}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
            </ReduxProvider>
        </JotaiProvider>
    );
}