import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAppSelector } from "./reduxHooks";
import {
  addTask,
  updateTaskInList,
  removeTaskFromList,
} from "../redux/slices/taskSlice";
import { useAppDispatch } from "./reduxHooks";
import type ITask from "../entitites/ITask";

export const useSocket = () => {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socketInstance = io("https://do-it-server-jsod.onrender.com", {
      transports: ["websocket", "polling"],
    });
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !userInfo?._id) return;

    socket.emit("joinRoom", userInfo._id);

    socket.on("taskCreated", (task: ITask) => {
      dispatch(addTask(task));
    });

    socket.on("taskUpdated", (task: ITask) => {
      dispatch(updateTaskInList(task));
    });

    socket.on("taskDeleted", (data: { id: string }) => {
      dispatch(removeTaskFromList(data.id));
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, [socket, userInfo, dispatch]);

  return socket;
};
