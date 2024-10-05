import { ChakraProvider, Box} from "@chakra-ui/react";
import ChatBox from "./components/Chatbox";

function App() {
  return (
    <ChakraProvider>
      <Box p={5}>
        <ChatBox />
      </Box>
    </ChakraProvider>
  );
}

export default App;

