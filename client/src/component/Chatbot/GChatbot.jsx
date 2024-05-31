import React, { useState, useEffect } from "react";
import "./chatbot.css";
import { Spin } from "antd";
import {
  VStack,
  Textarea,
  Box,
  Text,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { sendMessageToBot, initialHistory } from "./geminiApi";

function GChatbot({ isOpen, onOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [displayHistory, setDisplayHistory] = useState([]);

  useEffect(() => {
    setChatHistory(initialHistory);
  }, []);

 useEffect(() => {
   const processedHistory = chatHistory.slice(6);
   setDisplayHistory(processedHistory);
 }, [chatHistory]);


  const handleSendMessage = async (message) => {
    setLoading(true);

    const newMessage = {
      role: "user",
      parts: [{ text: message }],
    };

    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    try {
      const responseText = await sendMessageToBot(message, [
        ...chatHistory,
        newMessage,
      ]);
      const botResponse = {
        role: "model",
        parts: [{ text: responseText }],
      };

      setChatHistory((prevHistory) => [...prevHistory, botResponse]);
    } catch (error) {
      console.error("Error sending message to bot:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-bot">
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="sm">
        <DrawerOverlay />
        <DrawerContent borderRadius="lg">
          <DrawerCloseButton />
          <DrawerHeader>G-Bot</DrawerHeader>
          <DrawerBody>
            <VStack spacing="4" alignItems="stretch">
              {displayHistory.map((msg, index) => (
                <Box
                  key={index}
                  p="2"
                  bg={msg.role === "user" ? "blue.100" : "gray.100"}
                  borderRadius="lg"
                >
                  <Text fontSize="sm" color="gray.500">
                    {msg.role === "user" ? "You" : "G-Bot"}
                  </Text>
                  <Text fontSize="md" mt="1">
                    {msg.parts.map((part) => part.text).join(" ")}
                  </Text>
                </Box>
              ))}
            </VStack>
            <Divider mt="4" mb="4" />
            {loading ? (
              <Spin />
            ) : (
              <Textarea
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e.target.value);
                    e.target.value = "";
                  }
                }}
                placeholder="Type your message..."
                size="md"
                style={{
                  position: "absolute",
                  bottom: "20px",
                  width: "calc(100% - 4px)",
                }}
              />
            )}
          </DrawerBody>
          <DrawerFooter>{/* Optional Footer Content */}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default GChatbot;
