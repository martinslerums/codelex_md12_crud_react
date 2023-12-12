import './App.css';
import { useState } from 'react';
import useLocalStorage from 'use-local-storage';

type Task = {
    name: string;
    completed: boolean;
};

type TaskEditMode = {
    index: number;
    newValue: string;
};

const initialTasks = [{ name: 'Buy milk', completed: false }];

const initialEditMode = {
    index: -1,
    newValue: '',
};

const App = () => {
    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', initialTasks); // Visi taski
    const [taskValue, setTaskValue] = useState(''); // Input state
    const [editMode, setEditMode] = useState<TaskEditMode>(initialEditMode); // Edit state

 
    const editTask = (taskIndex: number, currentValue: string) => {
        setEditMode({
            index: taskIndex,
            newValue: currentValue,
        });
    };

    return (
        <>
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    const newTasks = [...tasks, { name: taskValue, completed: false }];
                    setTasks(newTasks);
                    setTaskValue('');
                }}
            >
                <h1>CREATE TASK</h1>
                <input
                    type="text"
                    value={taskValue}
                    onChange={(e) => {
                        setTaskValue(e.target.value);
                    }}
                />
                <button>Add task</button>
            </form>

            
            {editMode.index > -1 && (
                <form
                    className="form"
                    onSubmit={(e) => {
                        e.preventDefault();

                        const newTasks = tasks.map((item, index) => {
                            if (index === editMode.index) {
                                return {
                                    ...item,
                                    name: editMode.newValue,
                                };
                            }

                            return item;
                        });

                        setTasks(newTasks);
                        setEditMode(initialEditMode);
                    }}
                >
                    <h1>EDIT TASK</h1>
                    <input
                        type="text"
                        required
                        value={editMode.newValue}
                        onChange={(e) => {
                            setEditMode({
                                ...editMode,
                                newValue: e.target.value,
                            });
                        }}
                    />
                    <button>save</button>
                </form>
            )}
            <div className="wrapper">
                {tasks.map(({ name, completed }, index) => {
                    return (
                        <div className="card" key={Math.random()}> 
                            <h3>{name}</h3>
                            <span>status: {completed ? 'done' : 'undone'}</span>
                            <br />
                            <br />
                            <button onClick={() => editTask(index, name)}>Edit</button>
                            <button onClick={() => deleteTask(index)}>Delete</button>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default App;
