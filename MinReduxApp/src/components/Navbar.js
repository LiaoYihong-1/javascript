import { Component } from '../core/Components';
import {store} from "../store/store";

export class Navbar extends Component {
    constructor(router) {
        super();
        this.router = router
        if (store) {
            store.subscribe(() => this.update());
        }
    }

    render() {
        return this.createElement('nav', {
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                marginBottom: '20px',
                borderBottom: '1px solid #eee'
            }
        }, [
            this.createElement('div', { style: { fontWeight: 'bold' } }, ['Task Tracker']),
            this.createElement('div', {}, [
                this.createElement('button', {
                    onClick: () => {
                        window.history.pushState("","",'/about')
                        this.router.handleRoute()
                    },
                    style: {
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#2196F3'
                    }
                }, ['About'])
            ])
        ]);
    }
}