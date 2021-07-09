type BaseMessage = {
  id: string;
  username: string;
  timestamp: number;
};

export type UserMessagedMessage = BaseMessage & {
  type: "userMessaged";
  own: boolean;
  content: string;
};

export type UserConnectedMessage = BaseMessage & {
  type: "userConnected";
  own: boolean;
  content?: never;
};

export type UserDisconnectedMessage = BaseMessage & {
  type: "userDisconnected";
  own?: never;
  content?: never;
};

export type Message =
  | UserMessagedMessage
  | UserConnectedMessage
  | UserDisconnectedMessage;

export interface ConnectedUser {
  id: string;
  username: string;
}

export interface IncomingMessage extends ConnectedUser {
  content: string;
  timestamp: number;
}
