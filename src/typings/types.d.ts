interface Task {
	_id: string;
	description: string;
}

interface User {
	name: string;
	email: string;
	password: string;
	age: number;
}

interface customInputProps{
    name:string,
    type:string,
    label:string,
    error:string,
    register: (Ref:any, RegisterOptions?:any) => void
}