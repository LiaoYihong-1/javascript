import { Component } from '../core/Components';
import { store } from '../store/store';
import { addTask } from '../store/action';

export class TaskForm extends Component {
    constructor() {
        super();
        this.state = { inputValue: '' };
        if (store) {
            store.subscribe(() => this.update());
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.inputValue.trim()) {
            store.dispatch(addTask(this.state.inputValue));
        }
        localStorage.setItem('tasks', JSON.stringify(store.getState().tasks.tasks));

    }

    render() {
        return this.createElement('form', {
            onSubmit: (e) => {
                this.handleSubmit(e)
            },
            style: {
                display: 'flex',
                marginBottom: '20px'
            }
        }, [
            this.createElement('input', {
                type: 'text',
                value: this.state.inputValue,
                onChange: (e) => this.setState({ inputValue: e.target.value }),
                placeholder: 'Add a new task...',
                style: {
                    flexGrow: 1,
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px 0 0 4px',
                    fontSize: '16px'
                }
            }),
            this.createElement('button', {
                type: 'submit',
                style: {
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '0 4px 4px 0',
                    cursor: 'pointer',
                    fontSize: '16px'
                }
            }, ['Add Task'])
        ]);
    }
}