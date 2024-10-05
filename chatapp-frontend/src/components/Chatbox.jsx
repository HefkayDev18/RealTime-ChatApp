import React, { useState, useEffect } from "react";
import { Box, Input, Button, HStack, VStack, Text, Avatar, Heading, Flex } from "@chakra-ui/react";
import { io } from "socket.io-client";
import FormatTime from "../functions/FormatTime";

const socket = io("http://localhost:4000");


const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let storedUserId = sessionStorage.getItem("userId");

    if(!storedUserId){
        storedUserId = Math.random().toString(36).substring(7);
        sessionStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
        userId,
        text:input,
        time: FormatTime(new Date())
        // time: new Date().toLocaleTimeString(),
    }

      socket.emit("sendMessage", newMessage);
      setInput("");
  };

  const enterButton = (e) => {
    if(e.key ===  "Enter"){
        e.preventDefault();
        sendMessage();
    }
  }

  return (
    <VStack spacing={4} align="stretch">
        <Flex bg="teal.500" p={4} borderRadius="lg" boxShadow="2xl" color="white" align="center" justifyContent="space-between" w="full">
            <Heading as="h1"><b>Real-Time Chat Application</b></Heading>
            <Text>Welcome, {userId}</Text>
        </Flex>

        <Box h="100vh" w="full" p={4} borderWidth={1} boxShadow="lg" borderRadius="xl" overflowY="auto" bg="gray.50">
            {messages.map((msg, index) => (
                <HStack key={index} justify={msg.userId === userId ? "flex-start" : "flex-end"} my={3}>
                    {msg.userId === userId && <Avatar name="Me" bg="teal.500" />}
                    <Box
                        bg={msg.userId === userId ? "blue.200" : "green.200"}
                        p={3}
                        borderRadius="lg"
                        maxW="70%"
                        boxShadow="md"
                        w="full"
                    >
                        <Text ml={1}>{msg.text}</Text>
                        <Text fontSize="xs" color="gray.900" align="right"><b>{msg.time}</b></Text>
                    </Box>
                    {msg.userId !== userId && <Avatar name="Other" bg="purple.500" />}
                </HStack>
            ))}
        </Box>

        <HStack>
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                bg="white"
                borderColor="gray.300"
                focusBorderColor="teal.400"
                w="full"
                onKeyDown = {enterButton}
            />
            <Button onClick={sendMessage} colorScheme="teal">
                Send
            </Button>
        </HStack>
    </VStack>
  );
};

export default ChatBox;