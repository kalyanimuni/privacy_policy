import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        text: {
          100: "#FFFFFF1A",
          200: "#FFFFFF1A",
          300: "#FFFFFF33",
          400: "#FFFFFF66",
          500: "#FFFFFFCC",
          600: "#FFFFFF",
          700: "#1c1c1c",
          800: "#0c385a",
          900: "#1C1C1C",
        },
        primary: {
          100: "#1C1C1C",
          200: "#E3F5FF", //light blue
          300: "#E5ECF6", //light blue 2
          400: "#E5ECF680", //yellow
          500: "#F7F9FB", //light
          600: "#0d3f65", //dark blue
          700: "#0a2f4c", //dark blue 2
          800: "#062032", // dark blue 3
          900: "#031019", // dark blue 4
        },
        secondary: {
          100: "#23b6e4", //light blue
          200: "#1ea4cc", //light blue 2
          300: "#A8C5DA", //light blue 3
          400: "#B1E3FF", //light blue 4
          500: "#2dcd71", // green
          600: "#29b765", // green 2
          700: "#e84d3c", // light red
          800: "#d04336", // red
          900: "#666666", // light black
        },
        accent: {
          100: "#f29d11", //light yellow
          200: "#db8d10", //dark yellow
          300: "#c9e3f8", //blue
          400: "#b7daf5", //blue.400
          500: "#a5d1f3", //blue.500
          600: "#84a7c2", //metalic
          700: "#637d92", //dark metallic
          800: "#425461", // grey
          900: "#212a31", //dark blue
        },
        blueAccent: {
          100: "#d7ecec",
          200: "#aedad9",
          300: "#86c7c5",
          400: "#5db5b2",
          500: "#35a29f",
          600: "#2a827f",
          700: "#02b2af",
          800: "#2e96ff",
          900: "#b800d8",
        },
      }
    : {
        text: {
          100: "#1C1C1C0D",
          200: "#1C1C1C1A",
          300: "#1C1C1C33",
          400: "#1C1C1C66",
          500: "#1C1C1CCC",
          600: "#1C1C1C",
          700: "#1c1c1c",
          800: "#02070b",
          900: "#ffffff",
        },
        primary: {
          100: "#F7F9FB",
          200: "#E5ECF680",
          300: "#E5ECF6",
          400: "#E3F5FF",
          500: "#F7F9FB", //light
          600: "#0d3f65",
          700: "#0a2f4c",
          800: "#062032",
          900: "#031019",
        },
        secondary: {
          100: "#23b6e4",
          200: "#1ea4cc",
          300: "#A8C5DA",
          400: "#B1E3FF",
          500: "#2dcd71",
          600: "#29b765", // green 2
          700: "#e84d3c",
          800: "#d04336",
          900: "#666666",
        },
        accent: {
          100: "#f29d11",
          200: "#db8d10",
          300: "#78bbed",
          400: "#4ba4e7",
          500: "#1e8de1",
          600: "#1871b4",
          700: "#637d92", //dark metallic
          800: "#0c385a",
          900: "#061c2d",
        },
        blueAccent: {
          100: "#d7ecec",
          200: "#aedad9",
          300: "#86c7c5",
          400: "#5db5b2",
          500: "#35a29f",
          600: "#2a827f",
          700: "#02b2af",
          800: "#2e96ff",
          900: "#b800d8",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.text[700],
              main: colors.text[500],
              light: colors.text[100],
            },
            background: {
              default: "#04111b",
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.text[700],
              main: colors.text[500],
              light: colors.text[100],
            },
            background: {
              default: "#ffffff",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
