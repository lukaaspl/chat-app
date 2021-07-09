import { VStack } from "@chakra-ui/react";
import MessageComponent from "components/message";
import { Message } from "domains/chat";
import React, { useEffect, useRef } from "react";

interface PreviewProps {
  messages: Message[];
}

function Preview({ messages }: PreviewProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <VStack
      ref={containerRef}
      m="2"
      spacing="10px"
      w="lg"
      border="1px solid"
      borderColor="twitter.100"
      borderRadius="md"
      p="4"
      h="sm"
      overflow="auto"
    >
      {messages.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </VStack>
  );
}

export default Preview;
