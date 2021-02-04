import React from 'react';
import styles from './TaskListItem.module.css';
import { CustomButton } from '../Elements/CustomButton';

interface Props {
    task: Task,
    deleteTaskParent: (_id: string) => void
}

export const TaskListItem: React.FC<Props> = ({ task, deleteTaskParent }) => {
    return (
        <div className={styles.itemContainer}>
            <p className={styles.itemOne}>{task.description}</p>
            <CustomButton
                label='Delete'
                type='button'
                classNamee={styles.itemTwo}
                click={() => {
                    deleteTaskParent(task._id)
                }}
            />
        </div>
    );
};