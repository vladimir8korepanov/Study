import { Modal } from "./components/Modal";
import { Flex } from "@radix-ui/themes";

function App() {
  return (
    <Flex className="p-8">
      <Modal
        trigger={
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Edit profile
        </button>
        }
        title="Edit profile"
        description="Make changes to your profile."
      >
        <label className="block">
          <span className="block text-sm font-medium mb-1">
            Name
          </span>
          <input 
           defaultValue="Pampam Pampanovich"
           placeholder="Enter your full name"
           className="w-full px-3 py-2 border rounded-md"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-1">
            Email
          </span>
          <input 
           defaultValue="Pam@example.com"
           placeholder="Enter your email"
           className="w-full px-3 py-2 border rounded-md"
          />
        </label>
      </Modal>
    </Flex>
  );
}

export default App;
