import Controller from "./lib/Controller";

export type TCard = {
  CARD_ID: string;
  CARD_DATA: string;
  CARD_DESCRIPTION?: string
};

export type TListCards = TCard[];

export type TBoardLists = {
  LIST_ID: string;
  LIST_ORDER: number;
  LIST_TITLE: string;
  LIST_COLOR?: string;
  LIST_CARDS: TListCards;
};

export type TWorkspaceBoards = {
  BOARD_ID: string;
  BOARD_TITLE: string;
  BOARD_LISTS: TBoardLists[];
};

export type TUserWorkspace = {
  WORKSPACE_ID: string;
  WORKSPACE_TITLE: string;
  WORKSPACE_PS: string[];
  WORKSPACE_BOARDS: TWorkspaceBoards[];
};

export type TUserParticipant = {
  PARTICIPANT_NAME: string;
  PARTICIPANT_LOGO: string;
};

export type TUserSettings = {
  USER_LOGO: string;
  USER_BG: string;
  USER_LANG: string;
  USER_THEME: string;
  USER_PARTICIPANTS: TUserParticipant[];
};

export type TUser = {
  USER_ID: string;
  USER_NAME: string;
  USER_PASSWORD: string;
  USER_WORKSPACES: TUserWorkspace[];
  USER_SETTINGS: TUserSettings;
};

export interface ISignIn {
  setUserData: Function,
  APP_CONTROLLER: Controller,
  setViewErrorModal: Function,
  setErrorMessage: Function
}

type TSetState = (addParticipantModal: boolean) => void;
type TSetStateWork = (addParticipantModal: string) => void;
type TSetStatePart = (workspaceId: string, addParticipantModal: string, act: string) => void;
type TSetViewModal = (view: boolean) => void;

export type TProps = {};

export type TPropsBoard = {
  setUserData: Function;
  WORKSPACE_ID: string;
  BOARD: TWorkspaceBoards;
  APP_CONTROLLER: Controller;
};

export type TPropsAllWorkspaces = {
  user: TUser;
  setUserData: Function;
  APP_CONTROLLER: Controller
};

export type TPropsErrorModal = {
  errorMessage: string;
  viewErrorModal: boolean;
  setViewErrorModal: TSetViewModal;
};

export type TParticipantsProps = {
  WORKSPACE_ID: string;
  participantsArr: string[];
  setAddParticipantModal: TSetViewModal;
  setCurrentWorkspaceId: TSetStateWork;
  setParticipant: TSetStatePart;
  users: TUserParticipant[];
  userLogo: string;
};

export type TParticipantsModalProps = {
  setParticipant: TSetStatePart;
  viewPartModal: boolean;
  setViewPartModal: TSetState;
  currentWorkspaceId: string;
  users: TUserParticipant[];
};

export type TParticipantProps = {
  participant: string;
  setCurrentWorkspaceId: TSetStateWork;
  WORKSPACE_ID: string;
  setParticipant: TSetStatePart;
  partObj: TUserParticipant | undefined;
  userLogo: string;
};

export type TStringArguments = {
  [key: string]: string
}

export type TListModalProps = {
  showListModal: boolean;
  setShowListModal: Function;
  currentWorkspace: string;
  currentBoard: string;
  currentList: string;
  APP_CONTROLLER: Controller;
  setUserData: Function;
}

export type TTaskModalProps = {
  showModal: boolean;
  setShowModal: Function;
  currentWorkspace: string;
  currentBoard: string;
  currentList: string;
  currentTask: string;
  APP_CONTROLLER: Controller;
  setUserData: Function;
}

export type TAddNewTaskProps = {
  APP_CONTROLLER: Controller;
  setUserData: Function;
  WORKSPACE_ID: string;
  BOARD_ID: string;
  list: TBoardLists
}

export type TAccountSettingsProps = {
  userData: TUser;
  setUserData: Function;
  APP_CONTROLLER: Controller;
}