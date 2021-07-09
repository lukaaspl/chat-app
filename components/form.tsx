import { Button, Textarea, VStack } from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormProps {
  onSendMessage: (content: string) => void;
}

type FormValues = {
  content: string;
};

function Form({ onSendMessage }: FormProps): JSX.Element {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const handleValid: SubmitHandler<FormValues> = (values) => {
    onSendMessage(values.content);
    reset();
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    const isEnter = e.key === "Enter";
    const hasMessage =
      (e.target as HTMLTextAreaElement).value.trim().length > 0;

    if (isEnter) {
      e.preventDefault();

      if (hasMessage) {
        handleSubmit(handleValid)();
      }
    }
  };

  return (
    <VStack
      as="form"
      mt="2"
      spacing="10px"
      w="lg"
      onSubmit={handleSubmit(handleValid)}
    >
      <Textarea
        colorScheme="twitter"
        placeholder="Enter your message..."
        onKeyPress={handleKeyPress}
        data-gramm={false}
        {...register("content", {
          required: true,
          minLength: 1,
        })}
      />
      <Button colorScheme="twitter" variant="solid" type="submit">
        Send message
      </Button>
    </VStack>
  );
}

export default Form;
