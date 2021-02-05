import React from 'react';
import styles from './TaskListItem.module.css';
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
            <Box>
                <CustomButton
                    label='-'
                    type='button'
                    classNamee={styles.itemTwo}
                    click={() => {
                        deleteTaskParent(task._id)
                    }}
                />
            </Box>

        </Flex>
    );
};