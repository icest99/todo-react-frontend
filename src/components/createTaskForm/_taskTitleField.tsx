import React, {FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { ITextField } from './interfaces/ITextField';

//set ITextField as generic for props
export const TaskTitleField: FC<ITextField> = (props): ReactElement => {
    const {
        //set default values
        onChange = (e) => console.log(e),
        disabled = false
    } = props
    return (
        <TextField
        id="title"
        label="Task Title"
        placeholder="Task Title"
        variant="outlined"
        size="small"
        fullWidth
        onChange={onChange}
        disabled={disabled}
        />
    )
};

TaskTitleField.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}