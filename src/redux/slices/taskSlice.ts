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
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
    updateTaskInList: (state, action: PayloadAction<ITask>) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTaskFromList: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTaskInList, removeTaskFromList } =
  taskSlice.actions;
export default taskSlice.reducer;
