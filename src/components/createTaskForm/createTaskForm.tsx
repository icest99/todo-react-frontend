import React, {FC, ReactElement, useEffect, useState, useContext } from 'react';
import {Box, Typography, Stack, LinearProgress, Button, Alert, AlertTitle } from '@mui/material';
import { useMutation } from 'react-query';

import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { TaskStatusChangedContext } from '../../context';

export const CreateTaskForm: FC = (): ReactElement => {

    const [title, setTitle] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(  undefined)
    const [date, setDate] = useState<Date | null>(new Date())
    const [status, setStatus] = useState<string>(Status.todo);
    const [priority, setPriority] = useState<string>(Priority.medium);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const tasksUpdatedContext = useContext(
        TaskStatusChangedContext,
    );

    //Create task mutations
    const createTaskMutation = useMutation(
        (data: ICreateTask) =>
        sendApiRequest(
            'https://typescript-todo-api.onrender.com/tasks',
            'POST',
            data
        )
    )

    function createTaskHandler() {
        //in production should use lib like YUP to validate form field
        if (!title || !date || !description) {
            return;
        }

        const task: ICreateTask = {
            title,
            description,
            date: date.toString(),
            status,
            priority,
        };

        console.log("TEST", task)

        createTaskMutation.mutate(task);//fire api request
    }

    // Manage Side Effect
    useEffect(() => {
        if(createTaskMutation.isSuccess) {
            setShowSuccess(true);
            tasksUpdatedContext.toggle();
        }
        const successTimeout = setTimeout(() => {
            setShowSuccess(false)
        }, 6000)

        return () => {
            clearTimeout(successTimeout);
        }
    }, [createTaskMutation.isSuccess])


    return(
        <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-start'
            width="100%"
            px={4}
            my={6}
            >   
                {showSuccess && (
                    <Alert
                    severity='success'
                    sx={{
                        width: '100%',
                        marginBottom: '16px'
                    }}
                >
                    <AlertTitle>Success</AlertTitle>
                    The task was created successfully
                </Alert>
                )}
                <Typography mb={2} component='h2' variant='h6'>
                    Create A Task
                </Typography>
                <Stack spacing={2} sx={{width: '100%'}}>
                    <TaskTitleField 
                        onChange={(e) => {
                        setTitle(e.target.value)
                        }}
                        disabled={createTaskMutation.isLoading}

                    />
                    <TaskDescriptionField
                        onChange={
                        (e) => setDescription(e.target.value)}
                        disabled={createTaskMutation.isLoading}
                    />
                    <TaskDateField
                        value={date}
                        onChange={(date) => setDate(date)}
                        disabled={createTaskMutation.isLoading}
                    />
                    <Stack direction="row" spacing={2} sx={{width: '100%'}}>
                        <TaskSelectField
                        label='Status'
                        name='status'
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as string
                        )}
                        disabled={createTaskMutation.isLoading}
                        items={[
                            {
                                value: Status.todo,
                                label: Status.todo.toUpperCase(),
                            },
                            {
                                value: Status.inProgress,
                                label: Status.inProgress.toUpperCase(),
                            },
                        ]} />
                        <TaskSelectField label='Priority'
                        name='priority'   
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value as string
                        )}
                        disabled={createTaskMutation.isLoading}
                        items={[
                            {
                                value: Priority.low,
                                label:Priority.low
                            },
                            {
                                value: Priority.medium,
                                label:Priority.medium
                            },
                            {
                                value: Priority.high,
                                label:Priority.high
                            },
                        ]}
                        />
                    </Stack>
                    {/* if loading true, then use LinearProgerss */}
                    {createTaskMutation.isLoading && <LinearProgress />}
                    <Button
                        //if these field is not filled, then disabled button
                        disabled={
                            !title ||
                            !description ||
                            !date ||
                            !status ||
                            !priority
                        }
                        onClick={createTaskHandler}
                        variant="contained"
                        size="large"
                        fullWidth
                    >Create A Task</Button>
                </Stack>

        </Box>
    )
}