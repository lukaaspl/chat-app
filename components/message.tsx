import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Message } from "domains/chat";
import React from "react";
import { isUserConnectedMessage, isUserDisconnectedMessage } from "utils/chat";

interface MessageProps {
  message: Message;
}

const prettyTime = (timestamp: number): string =>
  dayjs(timestamp).format("HH:mm:ss");

function MessageComponent({ message }: MessageProps): JSX.Element {
  if (isUserConnectedMessage(message)) {
    const { own, username, timestamp } = message;

    return (
      <Flex
        align="center"
        justify="space-between"
        w="100%"
        p="2"
        borderRadius="sm"
        bg={own ? "twitter.50" : "twitter.200"}
      >
        <Text fontSize="xs">
          {own ? (
            <span>
              You have joined to the chat as <b>{username}</b>
            </span>
          ) : (
            <span>
              User <b>{username}</b> has joined to the chat
            </span>
          )}
        </Text>
        <Text fontSize="xs">{prettyTime(timestamp)}</Text>
      </Flex>
    );
  }

  if (isUserDisconnectedMessage(message)) {
    const { username, timestamp } = message;

    return (
      <Flex
        align="center"
        justify="space-between"
        w="100%"
        p="2"
        borderRadius="sm"
        bg="red.500"
        color="white"
      >
        <Text fontSize="xs">
          <span>
            User <b>{username}</b> has left from the chat
          </span>
        </Text>
        <Text fontSize="xs">{prettyTime(timestamp)}</Text>
      </Flex>
    );
  }

  const { own, username, timestamp, content } = message;

  return (
    <Box
      w="45%"
      p="2"
      borderRadius="sm"
      bg={own ? "twitter.50" : "twitter.200"}
      alignSelf={own ? "flex-start" : "flex-end"}
    >
      <HStack justify="space-between">
        <Text fontWeight="bold" fontSize="xs">
          {username} {own && "(me)"}
        </Text>
        <Text fontSize="xs">{prettyTime(timestamp)}</Text>
      </HStack>
      <Text fontSize="xs">{content}</Text>
    </Box>
  );
}

export default MessageComponent;
