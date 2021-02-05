import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AddItemComponent } from '../../components/AddItemComponent/AddItemComponent';
import { TaskListComponent } from '../../components/TaskList/TaskList';
import { UserContext } from '../../Contexts/UserContext';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    Flex,
    Spacer,
    Box,
    Heading,
    Button,
    Container,
    Progress
} from "@chakra-ui/react"

type res = {
    data: {
        data: Array<Task>,
        token: string
    }
    status: number
}

export const Main: React.FC = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const { user, setUserState } = useContext(UserContext);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const history = useHistory();


    useEffect(() => {

        if (!localStorage.getItem('userTaskToken')) {
            history.push('/');
        }

        if (user.name === "" && localStorage.getItem('userData')) {
            setUserState(JSON.parse(localStorage.getItem('userData') || '{name:"John Doe"}'));
        }

        setIsLoadingList(!isLoadingList);

        axios.get(`${process.env.REACT_APP_BASE_URL}/task`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userTaskToken')}`
            }
        }).then((response: res) => {
            if (response.status === 200) {
                setTasks(response.data.data);
            } else if (response.status === 400) {
                console.log("something went wrong");
            }
        }).catch(error => {
            console.log(error);
            console.log("something went wrong");
        }).finally(() => {
            setIsLoadingList(false);
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

            if (response.status === 200) {
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
        <div>
            <Flex borderWidth="1px" p={8}>
                <Box p="2">
                    <Heading size="md"> Tasks</Heading>
                </Box>
                <Spacer />
                <Box>
                    <Menu>
                        <MenuButton as={Button} colorScheme={'purple'}>
                            {user?.name}
                        </MenuButton>
                        <MenuList>
                            {/* <MenuGroup title="Profile">
                                <MenuItem>My Profile</MenuItem>
                            </MenuGroup> */}
                            <MenuDivider />
                            <MenuGroup>
                                <MenuItem onClick={() => {
                                    localStorage.removeItem('userTaskToken');
                                    history.push('/');
                                }}>LogOut</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>

            <Container mt={10} borderWidth={2} borderRadius={10}>
                <AddItemComponent addTask={addTask} />
            </Container>

            <Container mt={10} borderWidth={2} borderRadius={10} p={5}>
                {isLoadingList && <Progress size="sm" isIndeterminate />}
                <TaskListComponent userTasks={tasks} deleteTask={deleteTask} />
            </Container>
        </div>
    );
}
