import { Priority } from './../../createTaskForm/enums/Priority';
import { ITaskHeader } from "./ITaskHeader";
import { ITaskFooter } from "./ITaskFooter";
import { ITaskDescription } from "./ITaskDescription";

export interface ITask extends ITaskHeader, ITaskDescription, ITaskFooter {
    id: string;
    priority?: string;
    status?: string;
}
