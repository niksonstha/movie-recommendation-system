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
      "*::-webkit-scrollbar": {
        width: "5px",
      },

      "*::-webkit-scrollbar-track": {
        background: "transparent",
      },

      "*::-webkit-scrollbar-thumb": {
        backgroundColor: " #F1EFEF",
        borderRadius: "6px",
      },
    },
  },
});

export default theme;
