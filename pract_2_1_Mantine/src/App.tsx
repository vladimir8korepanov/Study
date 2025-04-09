import { MantineProvider, Box } from '@mantine/core';
import { DemoCalendar } from './components/Calendar';

function App() {
  return (
    <MantineProvider>
      <DemoCalendar />
    </MantineProvider>
  );
}

export default App;
