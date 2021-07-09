import { AppProps } from "next/app";
import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "styles/globals.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
