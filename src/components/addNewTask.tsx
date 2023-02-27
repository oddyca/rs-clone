import { useState } from "react";
import { EditableText } from "@blueprintjs/core";

import { TAddNewTaskProps } from "../AppTypes";

export default function AddNewTask(props: TAddNewTaskProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const { APP_CONTROLLER, setUserData, WORKSPACE_ID, BOARD_ID, list } = props;

  return (
    <EditableText
      multiline={false}
      confirmOnEnterKey
      maxLength={30}
      placeholder="Add new task +"
      value={newTaskTitle}
      onChange={(value: string) => setNewTaskTitle(value)}
      onConfirm={() => {
        APP_CONTROLLER.pushNewTask(WORKSPACE_ID, BOARD_ID, list, newTaskTitle);
        setUserData(structuredClone(APP_CONTROLLER.loadData()));
        setNewTaskTitle("");
      }}
    />
  );
}
