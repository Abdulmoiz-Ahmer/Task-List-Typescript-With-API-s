import React from 'react';
import { LoginComponent } from '../../components/LoginComponent/LoginComponent';
import { RegisterComponent } from '../../components/RegisterComponent/RegisterComponent';
import { Container } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export const InitialScreen: React.FC = () => {
    return (
        <Container>
            <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                    <Tab>Login</Tab>
                    <Tab>Register</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <LoginComponent />
                    </TabPanel>
                    <TabPanel>
                        <RegisterComponent />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}
