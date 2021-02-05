import React from 'react';
import { CustomButton } from '../Elements/CustomButton';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

interface Props {
    task: Task,
    deleteTaskParent: (_id: string) => void
}

export const TaskListItem: React.FC<Props> = ({ task, deleteTaskParent }) => {
    return (
        <Flex align={'center'} borderBottomWidth={1} mt={2} mb={2}>
            <Text>{task.description}</Text>
            <Spacer />
            <CustomButton
                label='-'
                type='button'
                click={() => {
                    deleteTaskParent(task._id)
                }}
                color='red'
            />
        </Flex>
    );
};