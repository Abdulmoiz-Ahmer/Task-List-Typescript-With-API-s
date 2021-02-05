import { TaskListItem } from '../TaskListItem/TaskListItem';



type text = {
    userTasks: Task[],
    deleteTask: (_id: string) => void
}
export const TaskListComponent: React.FC<text> = ({ userTasks, deleteTask }) => {

    const deleteTaskParent = (_id: string) => {
        deleteTask(_id);
    }
    return (
        <div>
            {
                userTasks.map((task: Task) => {
                    return (
                        <TaskListItem key={task._id} task={task} deleteTaskParent={deleteTaskParent} />
                    )
                })
            }
        </div>
    );
}
