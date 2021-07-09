import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import { MdExitToApp } from "react-icons/md";

type NavbarProps =
  | {
      isLogged?: never;
      username?: never;
      onLeave?: never;
    }
  | {
      isLogged: true;
      username: string;
      onLeave?: () => void;
    };

function Navbar(props: NavbarProps): JSX.Element {
  return (
    <Box bg="twitter.500">
      <Flex
        h="14"
        pl="3.5"
        pr="3.5"
        align="center"
        justify="space-between"
        maxW="1280px"
        margin="0 auto"
      >
        <Heading size="md" fontFamily="Poppins" color="white">
          ChatApp
        </Heading>
        {props.isLogged && (
          <Popover colorScheme="twitter" placement="left-end">
            <PopoverTrigger>
              <Avatar
                size="sm"
                bg="white"
                cursor="pointer"
                userSelect="none"
                color="twitter.500"
                name={props.username}
                getInitials={(name: string) => {
                  const [first, second] = name.split(" ");
                  return second
                    ? first.charAt(0) + second.charAt(0)
                    : name.substr(0, 2);
                }}
              />
            </PopoverTrigger>
            <PopoverContent w="52">
              <PopoverArrow />
              <PopoverHeader fontSize="sm" textAlign="center" p="2">
                Chatting as <b>{props.username}</b>
              </PopoverHeader>
              <PopoverBody p="0">
                <Button
                  isFullWidth
                  leftIcon={<MdExitToApp fontSize="18px" />}
                  size="sm"
                  colorScheme="red"
                  onClick={props.onLeave}
                  variant="ghost"
                >
                  Leave the chat
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Flex>
    </Box>
  );
}

export default Navbar;
