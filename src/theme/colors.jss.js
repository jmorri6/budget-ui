import { createMuiTheme } from 'material-ui/styles';

const colors = createMuiTheme({
  "palette": {
    "custom": {
      "blue": {
        "50": "#017ACD", // default + gradient
        "100": "#0C64C2", // blue text
        "200": "#09427D", // bold blue text
        "300": "#0C64C2", // blue button text for popups
        "A100": "#04C6F7" // light blue accent circle
      },
      "green": "#76C043",
      "grey": "#D7D7D7",
      "lightBlue": "#04C6F7",
      "orange": "#F47321",
      "teal": "#73B1AA",
      "yellow": "#FFC220"
    },
    "common": {
      "black": "rgba(0, 0, 0)",
      "white": "#fff",
      "brown": "rgb(80, 68, 68)",
      "transparent": "rgba(0, 0, 0, 0)",
      "fullBlack": "rgba(0, 0, 0, 1)",
      "darkBlack": "rgba(0, 0, 0, 0.87)",
      "lightBlack": "rgba(0, 0, 0, 0.54)",
      "minBlack": "rgba(0, 0, 0, 0.26)",
      "faintBlack": "rgba(0, 0, 0, 0.12)",
      "fullWhite": "rgba(255, 255, 255, 1)",
      "darkWhite": "rgba(255, 255, 255, 0.87)",
      "lightWhite": "rgba(255, 255, 255, 0.54)"
    },
    "error": {
      "50": "#ffebee",
      "100": "#ffcdd2",
      "200": "#ef9a9a",
      "300": "#e57373",
      "400": "#ef5350",
      "500": "#f44336",
      "600": "#e53935",
      "700": "#d32f2f",
      "800": "#c62828",
      "900": "#b71c1c",
      "A100": "#ff8a80",
      "A200": "#ff5252",
      "A400": "#ff1744",
      "A700": "#d50000",
      "contrastDefaultColor": "light"
    },
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#d5d5d5",
      "A200": "#aaaaaa",
      "A400": "#303030",
      "A700": "#616161",
      "contrastDefaultColor": "dark"
    },
    "shades": {
      "dark": {
        "text": {
          "primary": "rgba(255, 255, 255, 1)",
          "secondary": "rgba(255, 255, 255, 0.7)",
          "disabled": "rgba(255, 255, 255, 0.5)",
          "hint": "rgba(255, 255, 255, 0.5)",
          "icon": "rgba(255, 255, 255, 0.5)",
          "divider": "rgba(255, 255, 255, 0.12)",
          "lightDivider": "rgba(255, 255, 255, 0.075)"
        },
        "input": {
          "bottomLine": "rgba(255, 255, 255, 0.7)",
          "helperText": "rgba(255, 255, 255, 0.7)",
          "labelText": "rgba(255, 255, 255, 0.7)",
          "inputText": "rgba(255, 255, 255, 1)",
          "disabled": "rgba(255, 255, 255, 0.5)"
        },
        "action": {
          "active": "rgba(255, 255, 255, 1)",
          "disabled": "rgba(255, 255, 255, 0.3)"
        },
        "background": {
          "default": "#303030",
          "paper": "#424242",
          "appBar": "#212121",
          "contentFrame": "#212121"
        },
        "line": {
          "stepper": "#bdbdbd"
        }
      },
      "light": {
        "text": {
          "primary": "rgba(0, 0, 0, 0.87)",
          "secondary": "rgba(0, 0, 0, 0.54)",
          "disabled": "rgba(0, 0, 0, 0.38)",
          "hint": "rgba(0, 0, 0, 0.38)",
          "icon": "rgba(0, 0, 0, 0.38)",
          "divider": "rgba(0, 0, 0, 0.12)",
          "lightDivider": "rgba(0, 0, 0, 0.075)"
        },
        "input": {
          "bottomLine": "rgba(0, 0, 0, 0.42)",
          "helperText": "rgba(0, 0, 0, 0.54)",
          "labelText": "rgba(0, 0, 0, 0.54)",
          "inputText": "rgba(0, 0, 0, 0.87)",
          "disabled": "rgba(0, 0, 0, 0.42)"
        },
        "action": {
          "active": "rgba(0, 0, 0, 0.54)",
          "disabled": "rgba(0, 0, 0, 0.26)"
        },
        "background": {
          "default": "#fafafa",
          "paper": "#fff",
          "appBar": "#f5f5f5",
          "contentFrame": "#eeeeee"
        },
        "line": {
          "stepper": "#bdbdbd"
        }
      }
    },
    "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.38)",
      "hint": "rgba(0, 0, 0, 0.38)",
      "icon": "rgba(0, 0, 0, 0.38)",
      "divider": "rgba(0, 0, 0, 0.12)",
      "lightDivider": "rgba(0, 0, 0, 0.075)"
    },
    "input": {
      "bottomLine": "rgba(0, 0, 0, 0.42)",
      "helperText": "rgba(0, 0, 0, 0.54)",
      "labelText": "rgba(0, 0, 0, 0.54)",
      "inputText": "rgba(0, 0, 0, 0.87)",
      "disabled": "rgba(0, 0, 0, 0.42)"
    },
    "action": {
      "active": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.26)"
    },
    "background": {
      "default": "#fafafa",
      "paper": "#fff",
      "appBar": "#f5f5f5",
      "contentFrame": "#eeeeee"
    },
    "line": {
      "stepper": "#bdbdbd"
    }
  },
});

export default colors;