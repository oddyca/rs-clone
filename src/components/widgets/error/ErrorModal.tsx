import React from "react";
import { Button, Classes, Dialog } from "@blueprintjs/core";
import { TPropsErrorModal } from "../../../AppTypes";

function ErrorModal(props: TPropsErrorModal) {
  const { errorMessage } = props;
  const { viewErrorModal } = props;
  const { setViewErrorModal } = props;


  const DIALOG_FOOTER = (
    <Button
      onClick={() => {
        setViewErrorModal(false);
      }}
    >
      Ок
    </Button>
  );

  const DIALOG_BODY = (
    <div>
      {errorMessage}
    </div>
  );

  return (
    <Dialog
      title="Error"
      isOpen={viewErrorModal}
      onClose={() => {
        setViewErrorModal(false);
      }}
      canOutsideClickClose={false}
      isCloseButtonShown
    >
      <div className={Classes.DIALOG_BODY}>{DIALOG_BODY}</div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>{DIALOG_FOOTER}</div>
      </div>
    </Dialog>
  );
}

export default ErrorModal;
