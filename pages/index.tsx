import Chat from "components/chat";
import EnterForm from "components/enter-form";
import { Nullable } from "domains";
import { NextPage } from "next";
import React, { useState } from "react";
import { isUserConfirmed } from "utils/chat";

const IndexPage: NextPage = () => {
  const [username, setUsername] = useState<Nullable<string>>(null);

  if (isUserConfirmed(username)) {
    return <Chat username={username} onLeave={() => setUsername(null)} />;
  }

  return <EnterForm onPass={(passedUsername) => setUsername(passedUsername)} />;
};

export default IndexPage;
