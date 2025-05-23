import { Component } from '../core/Components';
import { store } from '../store/store';
import { deleteTask, toggleTask, editTask } from '../store/action';

export class TaskList extends Component {
    constructor() {
        super();
        this.state = { editingId: null, editText: '' };
        if (store) {
            store.subscribe(() => this.update());
        }
    }

    handleEdit(task) {
        this.setState({ editingId: task.id, editText: task.text });
    }

    handleSave(id) {
        store.dispatch(editTask(id, this.state.editText));
        this.setState({ editingId: null, editText: '' });
    }

    render() {
        const { tasks } = store.getState().tasks;

        return this.createElement('div', { style: { marginTop: '20px' } }, [
            this.createElement('h2', { style: { fontSize: '1.2em', marginBottom: '10px' } }, ['Tasks']),
            tasks.length === 0
                ? this.createElement('p', {}, ['No tasks yet. Add one above!'])
                : this.createElement('ul', { style: { listStyle: 'none', padding: 0 } },
                    tasks.map(task => {
                        let isEditing = this.state.editingId === task.id;

                        return this.createElement('li', {
                            key: task.id,
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px',
                                margin: '5px 0',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '4px'
                            }
                        }, [
                            this.createElement('input', {
                                type: 'checkbox',
                                checked: task.completed,
                                onChange: () => {
                                    store.dispatch(toggleTask(task.id))
                                    localStorage.setItem('tasks', JSON.stringify(store.getState().tasks.tasks));
                                },
                                style: { marginRight: '10px' }
                            }),

                            isEditing
                                ? this.createElement('input', {
                                    type: 'text',
                                    value: this.state.editText,
                                    onChange: (e) => {
                                        this.setState({ editText: e.target.value })
                                    },
                                    style: { flexGrow: 1, marginRight: '10px', padding: '5px' }
                                })
                                : this.createElement('span', {
                                    style: {
                                        flexGrow: 1,
                                        textDecoration: task.completed ? 'line-through' : 'none',
                                        color: task.completed ? '#888' : '#333'
                                    }
                                }, [task.text]),

                            isEditing
                                ? this.createElement('button', {
                                    onClick: () => {
                                        this.handleSave(task.id)
                                        localStorage.setItem('tasks', JSON.stringify(store.getState().tasks.tasks));
                                    },
                                    style: {
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        marginLeft: '5px'
                                    }
                                }, ['Save'])
                                : this.createElement('button', {
                                    onClick: () => this.handleEdit(task),
                                    style: {
                                        backgroundColor: '#2196F3',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        marginLeft: '5px'
                                    }
                                }, ['Edit']),

                            this.createElement('button', {
                                onClick: () => {
                                    store.dispatch(deleteTask(task.id))
                                    localStorage.setItem('tasks', JSON.stringify(store.getState().tasks.tasks));
                                },
                                style: {
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '3px',
                                    cursor: 'pointer',
                                    marginLeft: '5px'
                                }
                            }, ['Delete'])
                        ]);
                    })
                )
        ]);
    }
}