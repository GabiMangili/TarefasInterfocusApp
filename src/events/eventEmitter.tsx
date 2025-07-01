class EventEmitter {
    private events: { [key: string]: Function[] } = {};

    on(eventName: string, listener: Function) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    emit(eventName: string, data?: any) {
        const listeners = this.events[eventName];
        if (listeners) {
            listeners.forEach(listener => listener(data));
        }
    }

    off(eventName: string, listener?: Function) {
        const listeners = this.events[eventName];
        if (listeners) {
            if (listener) {
                const index = listeners.indexOf(listener);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            } else {
                delete this.events[eventName];
            }
        }
    }
}

const eventEmitter = new EventEmitter();

export default eventEmitter;
