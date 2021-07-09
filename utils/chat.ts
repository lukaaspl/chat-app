import {
  Message,
  UserConnectedMessage,
  UserDisconnectedMessage,
  UserMessagedMessage,
} from "domains/chat";
import { io } from "socket.io-client";

const CHAT_SOCKET_URL = "http://localhost:3001";

export const chatSocket = io(CHAT_SOCKET_URL, {
  autoConnect: false,
});

export const isUserMessagedMessage = (
  message: Message
): message is UserMessagedMessage => message.type === "userMessaged";

export const isUserConnectedMessage = (
  message: Message
): message is UserConnectedMessage => message.type === "userConnected";

export const isUserDisconnectedMessage = (
  message: Message
): message is UserDisconnectedMessage => message.type === "userDisconnected";

export const isUserConfirmed = (username: unknown): username is string =>
  typeof username === "string";
