import React from "react";

export interface ITaskFooter {
    //these 'React.' type can be found on MUI
    onStatusChange?: (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string,
        ) => void,
    onClick?: (
        e: 
        | React.MouseEvent<HTMLButtonElement> 
        | React.MouseEvent<HTMLAnchorElement>,
        id: string,
    ) => void;
    id: string,
    status?: string
}