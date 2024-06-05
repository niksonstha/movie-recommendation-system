import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      // Global styles for the entire application
      body: {
        bg: "#1C2321",
        fontFamily: '"Poppins", sans-serif',
        color: "white",
      },
    },
  },
});

export default theme;
