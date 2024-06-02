import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      // Global styles for the entire application
      body: {
        bg: "#373A40", // Set the background color for the body
      },
    },
  },
});

export default theme;
