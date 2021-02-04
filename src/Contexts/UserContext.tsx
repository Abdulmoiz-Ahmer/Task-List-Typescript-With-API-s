import React from 'react';

const UserContext = React.createContext({
	user: {},
	setUserState: (user: {
		age?: number,
		name?: string,
		_id?: string
	}) => { }
});

export { UserContext };

