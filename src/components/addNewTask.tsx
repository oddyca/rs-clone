import React, { useState } from 'react';
import { EditableText } from "@blueprintjs/core";

export default function AddNewTask(props: any) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const { APP_CONTROLLER, setUserData, WORKSPACE_ID, BOARD_ID, list } = props;

  return (
    <>
      <EditableText
        multiline={false}
        confirmOnEnterKey={true}
        maxLength={30}
        placeholder="Add new task +"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e)}
        onConfirm={(e) => {
          APP_CONTROLLER.pushNewTask(WORKSPACE_ID, BOARD_ID, list, newTaskTitle);
          setUserData(structuredClone(APP_CONTROLLER.loadData()));
          setNewTaskTitle("");
        }}
      />
    </>
  )
}
