import {
  Alert,
  Flex,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Form from "components/form";
import Preview from "components/preview";
import { ConnectedUser, IncomingMessage, Message } from "domains/chat";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { chatSocket as socket } from "utils/chat";
import Navbar from "./navbar";

interface ChatProps {
  username: string;
  onLeave: () => void;
}

type MessageWithoutMeta = Omit<Message, "id" | "timestamp"> & {
  timestamp?: Message["timestamp"];
};

function Chat({ username, onLeave }: ChatProps): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setConnected] = useState(socket.connected);
  const [hasError, setError] = useState(false);

  const addMessage = (messageWithoutMeta: MessageWithoutMeta): void => {
    const message = {
      ...messageWithoutMeta,
      id: nanoid(),
      timestamp: messageWithoutMeta.timestamp || Date.now(),
    } as Message;

    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSendMessage = (content: string): void => {
    socket.emit("message", content);

    addMessage({
      type: "userMessaged",
      own: true,
      timestamp: Date.now(),
      username,
      content,
    });
  };

  useEffect(() => {
    socket.auth = { username };
    socket.connect();

    socket.on("connect_error", () => {
      setError(true);
    });

    // current user connected
    socket.on("connect", () => {
      setConnected(true);
      addMessage({
        type: "userConnected",
        own: true,
        timestamp: Date.now(),
        username,
      });
    });

    // another user connected
    socket.on("user-connected", (user: ConnectedUser) => {
      addMessage({
        type: "userConnected",
        own: false,
        username: user.username,
      });
    });

    // another user disconnected
    socket.on("user-disconnected", (user: ConnectedUser) => {
      addMessage({
        type: "userDisconnected",
        username: user.username,
      });
    });

    // another user messaged
    socket.on("user-messaged", (incomingMessage: IncomingMessage) => {
      addMessage({
        type: "userMessaged",
        own: false,
        timestamp: incomingMessage.timestamp,
        username: incomingMessage.username,
        content: incomingMessage.content,
      });
    });

    return () => {
      socket.close();
    };
  }, [username]);

  return (
    <>
      {isConnected ? (
        <Navbar isLogged username={username} onLeave={onLeave} />
      ) : (
        <Navbar />
      )}
      <Flex align="center" justify="center" direction="column" h="90vh">
        {isConnected ? (
          <>
            <Preview messages={messages} />
            <Form onSendMessage={handleSendMessage} />
          </>
        ) : hasError ? (
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            w="50vw"
            minW="400px"
            maxW="600px"
            rounded="xl"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="xl">
              Connection error
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              An error occurred while connecting to the chat, please try again
              later.
            </AlertDescription>
          </Alert>
        ) : (
          <Spinner
            size="xl"
            color="twitter.500"
            emptyColor="twitter.50"
            thickness="3px"
          />
        )}
      </Flex>
    </>
  );
}

export default Chat;
