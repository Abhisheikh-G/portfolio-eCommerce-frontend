import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { red, grey, pink } from "@material-ui/core/colors";

// Create a theme instance.
let theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: pink[400],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
