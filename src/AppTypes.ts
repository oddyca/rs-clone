import AllWorkspaces from "./components/pages/AllWorkspaces";
import Participants from "./components/widgets/participant/Participants";

export type TCard = {
  CARD_ID: string;
  CARD_DATA: string;
};

export type TListCards = TCard[];

export type TBoardLists = {
  LIST_ID: string;
  LIST_ORDER: number;
  LIST_TITLE: string;
  LIST_CARDS: TListCards[];
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

export type TUser = {
  USER_ID: string;
  USER_NAME: string;
  USER_PASSWORD: string;
  USER_WORKSPACES: TUserWorkspace[];
};

type TSetState = (addParticipantModal: boolean) => void;
type TSetStateWork = (addParticipantModal: string) => void;
type TSetStatePart = (workspaceId: string, addParticipantModal: string, act: string) => void;

export type TProps = {};

export type TPropsAllWorkspaces = {
  user: TUser;
};

export type TParticipantsProps = {
  WORKSPACE_ID: string;
  participantsArr: string[];
  setAddParticipantModal: TSetState;
  setCurrentWorkspaceId: TSetStateWork;
  setParticipant: TSetStatePart;
};

export type TParticipantsModalProps = {
  setParticipant: TSetStatePart;
  viewPartModal: boolean;
  setViewPartModal: TSetState;
  currentWorkspaceId: string;
};

export type TParticipantProps = {
  participant: string;
  setCurrentWorkspaceId: TSetStateWork;
  WORKSPACE_ID: string;
  setParticipant: TSetStatePart;
};
