import { Button, Flex, Heading, HStack, Input } from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Navbar from "components/navbar";

interface EnterFormProps {
  onPass: (username: string) => void;
}

interface FormValues {
  username: string;
}

const MIN_USERNAME_LENGTH = 0;

function EnterForm({ onPass }: EnterFormProps): JSX.Element {
  const { register, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: { username: "" },
  });

  const isUsernameValid =
    watch("username").trim().length >= MIN_USERNAME_LENGTH;

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    onPass(values.username);
  };

  return (
    <>
      <Navbar />
      <Flex align="center" justify="center" direction="column" h="90vh">
        <Heading color="twitter.500" size="2xl" mb="8">
          Welcome to the chat!
        </Heading>
        <HStack as="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            size="lg"
            colorScheme="twitter"
            type="text"
            placeholder="Enter your name..."
            {...register("username", {
              required: true,
              minLength: MIN_USERNAME_LENGTH,
            })}
          />
          <Button
            disabled={!isUsernameValid}
            size="lg"
            colorScheme="twitter"
            type="submit"
          >
            Enter
          </Button>
        </HStack>
      </Flex>
    </>
  );
}

export default EnterForm;
