type EventHandler<Payload> = (payload: Payload) => void;
type EventMap<T extends string> = Record<T, any>;

export function createEventEmitter<T extends string>(){
    type Events = EventMap<T>;

    const listeners = new Map<T, Array<EventHandler<any>>>();

    return {
        on<E extends T>(event: E, handler: EventHandler<Events[E]>) {
            if (!listeners.has(event)) {
                listeners.set(event, []);
            }
            let handlers = listeners.get(event)!;
            handlers.push(handler);

            return () => this.off(event, handler);
        },

        emit<E extends T>(event: E, payload: E) {
            const handlers = listeners.get(event);
            if (handlers) {
                handlers.forEach(handler => handler(payload));
            }
        },

        off<E extends T>(event: E, handler?: EventHandler<Events[E]>) {
            const handlers = listeners.get(event);
            if (!handlers) return;

            if (handler) {
                const index = handlers.indexOf(handler);
                if (index !== -1) {
                    handlers.splice(index, 1);
                }
            } else {
                listeners.delete(event);
            }
        },

        clearAll() {
            listeners.clear();
        },


        listenerCount(event: T) {
            return listeners.get(event)?.length || 0;
        }
    };
}