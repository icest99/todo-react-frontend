import { IDisabled } from "./IDisabled"
import { SelectChangeEvent } from "@mui/material";

export interface ISelectItem {
    value: string;
    label: string;
}

export interface ISelectField extends IDisabled {
    name?: string;
    label?: string;
    value?: string;
    onChange?: (e: SelectChangeEvent) => void;
    items?: ISelectItem[];
}