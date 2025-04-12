import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import { LuFolder, LuCheckSquare, LuUser } from "react-icons/lu";
import "./App.css"

const App = () => {
  return (
    <Box p={4} maxW="800px" mx="auto">
      <Tabs variant="enclosed">
        <TabList>
          <Tab>
            <LuUser style={{ marginRight: "8px" }} />
            Участники
          </Tab>
          <Tab>
            <LuFolder style={{ marginRight: "8px" }} />
            Проекты
          </Tab>
          <Tab>
            <LuCheckSquare style={{ marginRight: "8px" }} />
            Настройки
          </Tab>
        </TabList>
        <TabPanels mt={4}>
          <TabPanel>
            <Box p={4}>Управляйте членами команды</Box>
          </TabPanel>
          <TabPanel>
            <Box p={4}>Управляйте своими проектами</Box>
          </TabPanel>
          <TabPanel>
            <Box p={4}>Управляйте задачами сотрудников</Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default App;