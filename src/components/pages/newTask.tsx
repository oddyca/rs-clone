import React, { useState } from "react";
import { EditableText } from "@blueprintjs/core";

function NewTask(props: any) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { setUserData } = props;
  const { APP_CONTROLLER } = props;
  const { WORKSPACE_ID } = props;
  const { BOARD_ID } = props;
  const { list } = props;

  return (
    <div>
      <EditableText
        multiline={false}
        confirmOnEnterKey={true}
        maxLength={30}
        value={newTaskTitle}
        placeholder="Add new task +"
        onChange={(e) => setNewTaskTitle(e)}
        onConfirm={(e) => {
          APP_CONTROLLER.pushNewTask(WORKSPACE_ID, BOARD_ID, list, newTaskTitle);
          setUserData(structuredClone(APP_CONTROLLER.loadData()));
          setNewTaskTitle("");
        }} />
    </div>
  );
}

export default NewTask;
