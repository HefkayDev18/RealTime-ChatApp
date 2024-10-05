import { ChakraProvider, Box} from "@chakra-ui/react";
import Chatbox from "./components/Chatbox";

function App() {
  return (
    <ChakraProvider>
      <Box p={5}>
        <Chatbox />
      </Box>
    </ChakraProvider>
  );
}

export default App;

