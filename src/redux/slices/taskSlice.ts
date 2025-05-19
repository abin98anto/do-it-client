import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type ITask from "../../entitites/ITask";

interface TaskState {
  tasks: ITask[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
