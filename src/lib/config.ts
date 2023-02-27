import { nanoid } from "nanoid";

export default {
  USER_ID: "1",
  USER_NAME: "user",
  USER_PASSWORD: "12345",
  USER_SETTINGS: {
    USER_LOGO:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZS8+PGcgaWQ9ImFib3V0Ij48cGF0aCBkPSJNMTYsMTZBNyw3LDAsMSwwLDksOSw3LDcsMCwwLDAsMTYsMTZaTTE2LDRhNSw1LDAsMSwxLTUsNUE1LDUsMCwwLDEsMTYsNFoiLz48cGF0aCBkPSJNMTcsMThIMTVBMTEsMTEsMCwwLDAsNCwyOWExLDEsMCwwLDAsMSwxSDI3YTEsMSwwLDAsMCwxLTFBMTEsMTEsMCwwLDAsMTcsMThaTTYuMDYsMjhBOSw5LDAsMCwxLDE1LDIwaDJhOSw5LDAsMCwxLDguOTQsOFoiLz48L2c+PC9zdmc+",
    USER_BG: "none",
    USER_LANG: "ENG",
    USER_THEME: "white",
    USER_PARTICIPANTS: [
      {
        PARTICIPANT_NAME: "",
        PARTICIPANT_LOGO: "",
      },
    ],
  },
  USER_WORKSPACES: [
    {
      WORKSPACE_ID: nanoid(),
      WORKSPACE_TITLE: "workspace-1",
      WORKSPACE_PS: ["user"],
      WORKSPACE_SETTINGS: {
        COLOR: "#F2F2F2",
      },
      WORKSPACE_BOARDS: [
        {
          BOARD_ID: "1",
          BOARD_TITLE: "board-1",
          BOARD_LISTS: [
            {
              LIST_ID: "1",
              LIST_ORDER: 1,
              LIST_TITLE: "list-1",
              LIST_CARDS: [
                {
                  CARD_ID: "1",
                  CARD_DATA: "some text about task-1",
                },
                {
                  CARD_ID: "2",
                  CARD_DATA: "some text about task-2",
                },
              ],
            },
            {
              LIST_ID: "2",
              LIST_ORDER: 2,
              LIST_TITLE: "list-2",
              LIST_CARDS: [
                {
                  CARD_ID: "1",
                  CARD_DATA: "some text about task-1",
                },
                {
                  CARD_ID: "2",
                  CARD_DATA: "some text about task-2",
                },
                {
                  CARD_ID: "3",
                  CARD_DATA: "some text about task-3",
                },
              ],
            },
          ],
        },
        {
          BOARD_ID: "2",
          BOARD_TITLE: "board-2",
          BOARD_LISTS: [
            {
              LIST_ID: "1",
              LIST_ORDER: 1,
              LIST_TITLE: "list-1",
              LIST_CARDS: [
                {
                  CARD_ID: "1",
                  CARD_DATA: "some text about task-1",
                },
                {
                  CARD_ID: "2",
                  CARD_DATA: "some text about task-1",
                },
                {
                  CARD_ID: "3",
                  CARD_DATA: "some text about task-1",
                },
              ],
            },
            {
              LIST_ID: "2",
              LIST_ORDER: 2,
              LIST_TITLE: "list-2",
              LIST_CARDS: [
                {
                  CARD_ID: "1",
                  CARD_DATA: "some text about task-1",
                },
                {
                  CARD_ID: "2",
                  CARD_DATA: "some text about task-1",
                },
                {
                  CARD_ID: "3",
                  CARD_DATA: "some text about task-1",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      WORKSPACE_ID: nanoid(),
      WORKSPACE_TITLE: "workspace-2",
      WORKSPACE_PS: ["user"],
      WORKSPACE_SETTINGS: {
        COLOR: "#F2F2F2",
      },
      WORKSPACE_BOARDS: [
        {
          BOARD_ID: "1",
          BOARD_TITLE: "board-1",
          BOARD_LISTS: [
            {
              LIST_ID: "1",
              LIST_ORDER: 1,
              LIST_TITLE: "list-1",
              LIST_CARDS: [
                {
                  CARD_ID: "1",
                  CARD_DATA: "some text about task-1",
                },
                {
                  CARD_ID: "2",
                  CARD_DATA: "some text about task-1",
                },
                {
                  CARD_ID: "3",
                  CARD_DATA: "some text about task-1",
                },
              ],
            },
            {
              LIST_ID: "2",
              LIST_ORDER: 2,
              LIST_TITLE: "list-2",
              LIST_CARDS: [
                {
                  CARD_ID: "1",
                  CARD_DATA: "some text about task-1",
                },
                {
                  CARD_ID: "2",
                  CARD_DATA: "some text about task-1",
                },
                {
                  CARD_ID: "3",
                  CARD_DATA: "some text about task-1",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
