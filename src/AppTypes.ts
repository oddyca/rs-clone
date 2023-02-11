type TCard = {
  CARD_ID: string;
  CARD_DATA: string;
};

type TListCards = TCard[];

type TBoardsLists = TListCards[];

type TWorkspaceBoards = TBoardsLists[];

type TUserWorkspaces = TWorkspaceBoards[];

type TUser = {
  USER_ID: string;
  USER_NAME: string;
  USER_PASSWORD: string;
  USER_WORKSPACES: TUserWorkspaces;
};

type TProps = {
  id: string;
};

type TPropsParticipants  = {
  id: string;
};

export type TPropsHeader = TPropsParticipants;
