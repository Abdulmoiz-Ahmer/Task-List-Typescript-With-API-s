import React from 'react';

const UserContext = React.createContext({
	user: {
		name:"John Doe"
	},
	setUserState: (user: {
		age: number,
		name: string,
		_id?: string
	}) => { }
});

export { UserContext };

