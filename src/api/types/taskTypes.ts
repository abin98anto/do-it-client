import type ITask from "../../entitites/ITask";

export default interface TaskResponse {
  success: boolean;
  data: ITask | ITask[];
  message?: string;
}
