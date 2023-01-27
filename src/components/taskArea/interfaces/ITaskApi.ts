import { Priority } from "../../createTaskForm/enums/Priority";
import { Status } from "../../createTaskForm/enums/Status";

export interface ITaskApi {
    id: string;
    date: string;
    title: string;
    description: string;
    priority: `${Priority}`; //(property) ITaskApi.priority: "high" | "medium" | "low" basically a union.
    status: `${Status}`
}