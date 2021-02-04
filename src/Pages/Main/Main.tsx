import React, { useEffect, useState, useContext } from 'react';
import styles from './main.module.css';
import { CustomToggleButton } from '../../components/Elements/CustomToggleButton';
import { useHistory } from 'react-router-dom';
import { AddItemComponent } from '../../components/AddItemComponent/AddItemComponent';
import { TaskListComponent } from '../../components/TaskList/TaskList';
import axios from 'axios';
import { UserContext } from '../../Contexts/UserContext';

type res = {
    data: {
        data: Array<Task>,
        token: string
    }
    status: number
}

export const Main = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const { user } = useContext(UserContext);
    const history = useHistory();


    useEffect(() => {

        if (!localStorage.getItem('userTaskToken')) {
            history.push('/');

        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/task`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userTaskToken')}`
            }
        }).then((response: res) => {
            if (response.status == 200) {
                setTasks(response.data.data);
            } else if (response.status === 400) {
                console.log("something went wrong");
            }
        }).catch(error => {
            console.log(error);
            console.log("something went wrong");
        })
    }, [])

    const addTask = (task: Task) => {
        let tempTasks = [...tasks];
        tempTasks.push(task);
        setTasks(tempTasks);
    }

    const deleteTask = (_id: string) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/task/${_id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userTaskToken')}`
            }
        }).then((response: res) => {

            if (response.status == 200) {
                let tempTasks = [...tasks];
                tempTasks.splice(tempTasks.findIndex(function (i) {
                    return i._id === _id;
                }), 1);
                setTasks(tempTasks);
            } else if (response.status === 400) {
                console.log("something went wrong");
            }
        }).catch(error => {
            console.log(error);
            console.log("something went wrong");
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={`${styles.headerItem} ${styles.headerItemOne}`}>{user.name} Tasks</div>
                <div className={`${styles.headerItem} ${styles.headerItemTwo}`}><CustomToggleButton label={'LogOut'} type={'button'} click={() => {
                    localStorage.removeItem('userTaskToken');
                    history.push('/');
                }} /></div>
            </div>
            <div>
                <AddItemComponent addTask={addTask} />
            </div>
            <div className={`${styles.bgColor}`} >
                <TaskListComponent userTasks={tasks} deleteTask={deleteTask} />
            </div>

        </div>
    );
}
