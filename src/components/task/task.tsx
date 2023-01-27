import React, {FC, ReactElement} from 'react';
import { Box } from '@mui/system';
import { TaskDescription } from './_taskDescription';
import { TaskHeader } from './_taskHeader';
import { TaskFooter } from './_taskFooter';
import { Status } from '../createTaskForm/enums/Status';
import { Priority } from '../createTaskForm/enums/Priority';
import { ITask } from './interfaces/ITask';

import PropTypes from 'prop-types';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';

export const Task: FC<ITask> = (props): ReactElement => {

    //set default val
    const {
        title = 'Test Title',
        date = new Date(),
        description = 'lorem ipsum dolor so dil',
        priority = Priority.medium,
        status = Status.completed,
        onStatusChange = (e) => console.log(e),
        onClick = (e) => console.log(e),
        id,
    } = props;

    return (
    <Box
        display="flex"
        width="100%"
        justifyContent="flex-start"
        flexDirection="column"
        mb={3}
        p={4}
        sx={{
            width: '100%',
            backgroundColor:'background.paper',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: renderPriorityBorderColor(priority)
        }}
    >
        <TaskHeader title={title} date={date} />
        <TaskDescription description={description} />
        <TaskFooter id={id} status={status} onClick={onClick} onStatusChange={onStatusChange} />
    </Box>);
}

Task.propTypes = {
    title: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    onStatusChange: PropTypes.func,
    onClick: PropTypes.func,
    priority: PropTypes.string,
    status: PropTypes.string
}