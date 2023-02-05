import React, { ReactNode } from "react";
import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";
import { Global, css } from "@emotion/react";

import CssBaseline from "@mui/material/CssBaseline";

const globalStyles = css`
  :root {
    --constant-black: #000;
    --constant-white: #fff;

    --global-shadow: 0 4px 32px 0 var(--color-black-transparent-01);
    --global-transition: 100ms linear;

    --color-beluga: #f1f1f1;
    --color-carbon-fiber: #2e2e2e;
    --color-chaos-black: #0f0f0f;
    --color-cold-morning: #e5e5e5;
    --color-dhusar-grey: #aaa;
    --color-dire-wolf: #282828;
    --color-kettleman: #606060;
    --color-red: #f00;
    --color-silver: #eee;

    --color-black-transparent-01: rgba(0, 0, 0, 0.1);
    --color-black-transparent-04: rgba(0, 0, 0, 0.4);
    --color-black-transparent-005: rgba(0, 0, 0, 0.05);

    --color-white-transparent-01: rgba(255, 255, 255, 0.1);
    --color-white-transparent-02: rgba(255, 255, 255, 0.2);
    --color-white-transparent-04: rgba(255, 255, 255, 0.4);

    --header-height: 56px;
    --aside-width: 240px;
  }

  [data-theme="light"] {
    --color-bg: var(--constant-white);
    --color-text: var(--color-chaos-black);

    --header-bg: var(--constant-white);
    --header-drawer-button-icon-color: var(--color-chaos-black);
    --header-logo-text-color: var(--color-chaos-black);

    --user-menu-bg: var(--constant-white);
    --user-menu-item-hover-bg: var(--color-black-transparent-005);

    --aside-bg: var(--color-chaos-white);
    --aside-link-active-bg: var(--color-beluga);

    --sign-in-button-border-color: var(--color-cold-morning);
    --sign-in-button-avatar-color: var(--color-text);
    --sign-in-button-text-color: var(--color-text);

    --button-contained-bg: var(--color-silver);
    --button-contained-text-color: var(--color-dire-wolf);
    --button-text-bg: var(--color-chaos-black);

    --upload-video-droparea-active-bg: var(--color-cold-morning);
    --upload-video-icon-button-bg: var(--color-beluga);
    --upload-video-icon-color: var(--color-carbon-fiber);
    --upload-video-modal-bg: var(--constant-white);

    --tab-text-active-color: var(--color-chaos-black);
    --tab-text-color: var(--color-kettleman);

    --search-border-color: var(--color-black-transparent-01);
    --search-button-bg: var(--color-silver);
    --search-button-border-color: var(--color-white-transparent-01);

    --custom-scrollbar-line-bg: var(--color-black-transparent-01);
    --divider-color: var(--color-black-transparent-01);
    --drawer-bg: var(--constant-white);
    --icon-button-disabled-color: var(--color-black-transparent-01);
    --modal-close-button-color: var(--constant-white);
    --pagination-item-active-bg: var(--color-silver);
    --register-user-avatar-bg: var(--color-carbon-fiber);
    --skeleton-color: var(--color-cold-morning);
  }

  [data-theme="dark"] {
    --color-bg: var(--color-chaos-black);
    --color-text: var(--constant-white);

    --header-bg: var(--color-chaos-black);
    --header-drawer-button-icon-color: var(--constant-white);
    --header-logo-text-color: var(--constant-white);

    --user-menu-bg: var(--color-dire-wolf);
    --user-menu-item-hover-bg: var(--color-white-transparent-01);

    --aside-bg: var(--color-chaos-black);
    --aside-link-active-bg: var(--color-carbon-fiber);

    --sign-in-button-border-color: var(--color-kettleman);
    --sign-in-button-avatar-color: var(--color-text);
    --sign-in-button-text-color: var(--color-text);

    --button-contained-bg: var(--color-beluga);
    --button-contained-text-color: var(--color-chaos-black);
    --button-text-bg: var(--color-beluga);

    --upload-video-droparea-active-bg: var(--color-chaos-black);
    --upload-video-icon-button-bg: var(--color-cold-morning);
    --upload-video-icon-color: var(--color-carbon-fiber);
    --upload-video-modal-bg: var(--color-dire-wolf);

    --tab-text-active-color: var(--color-beluga);
    --tab-text-color: var(--color-dhusar-grey);

    --search-border-color: var(--color-white-transparent-02);
    --search-button-bg: var(--color-dire-wolf);
    --search-button-border-color: var(--color-white-transparent-01);

    --custom-scrollbar-line-bg: var(--color-white-transparent-04);
    --divider-color: var(--color-white-transparent-02);
    --drawer-bg: var(--color-chaos-black);
    --icon-button-disabled-color: var(--color-dire-wolf);
    --modal-close-button-color: var(--constant-white);
    --pagination-item-active-bg: var(--color-kettleman);
    --register-user-avatar-bg: var(--color-cold-morning);
    --skeleton-color: var(--color-silver);
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text);
  }

  a {
    color: var(--color-text);
    text-decoration: none;
  }
`;

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "15px",
          padding: "8px 16px",
          minWidth: "94px",
          textTransform: "initial",
          "&.MuiButton-text": {
            color: "var(--button-text-bg)",
          },
          "&.MuiButton-contained": {
            backgroundColor: "var(--button-contained-bg)",
            color: "var(--button-contained-text-color)",

            "&.Mui-disabled": {
              opacity: "0.2",
            },
          },
        },
      },
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        variant: "contained",
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "var(--drawer-bg)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:disabled": {
            color: "var(--icon-button-disabled-color)",
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--skeleton-color)",
          transform: "none",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: "0",
          cursor: "pointer",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "var(--color-text)",

          "&.Mui-selected": {
            backgroundColor: "var(--pagination-item-active-bg)",
            "&:hover": {
              backgroundColor: "var(--pagination-item-active-bg)",
            },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "var(--tab-text-active-color)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "var(--tab-text-color)",
          "&.active": {
            color: "var(--tab-text-active-color)",
          },
          "&.Mui-selected": {
            color: "var(--tab-text-active-color)",
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "var(--color-text)",
          },

          "&:not(.Mui-error) fieldset": {
            borderColor: "var(--color-text)",
          },

          "& .MuiInput-underline:after": {
            borderBottomColor: "var(--color-text)",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused:not(.Mui-error) fieldset": {
              borderColor: "var(--color-text)",
            },

            "&:hover:not(.Mui-error) fieldset": {
              borderColor: "var(--color-text)",
            },
          },
          "& .MuiFormLabel-root": {
            color: "var(--color-text)",

            "&.Mui-focused:not(.Mui-error)": {
              color: "var(--color-text)",
            },
          },
        },
      },
    },
  },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <Provider theme={theme}>
      <>
        <CssBaseline />
        <Global styles={globalStyles} />
        {children}
      </>
    </Provider>
  );
}
