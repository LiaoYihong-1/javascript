import { Component } from '../core/Components';

export class About extends Component {
    render() {
        return this.createElement('div', {
            style: {
                padding: '20px',
                textAlign: 'center'
            }
        }, [
            this.createElement('h1', {}, ['Hello World']),
            this.createElement('p', {}, ['This is the About page']),
            this.createElement('button', {
                onClick: () => window.history.back(),
                style: {
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '0 4px 4px 0',
                    cursor: 'pointer',
                    fontSize: '16px'
                }
            }, ['Back to Home'])
        ]);
    }
}