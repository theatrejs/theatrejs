interface SensorErrorEventInit extends EventInit {

    error: Error;
}

declare class SensorErrorEvent extends Event {

    readonly error: Error;

    constructor(type: string, options: SensorErrorEventInit);
}

declare class Sensor extends EventTarget {

    readonly activated: boolean;
    readonly hasReading: boolean;
    readonly timestamp?: number;

    addEventListener(type: 'activate' | 'reading', listener: (this: this, event: Event) => any, useCapture?: boolean): void;
    addEventListener(type: 'error', listener: (this: this, event: SensorErrorEvent) => any, useCapture?: boolean): void;

    onactivate?: (this: this, event: Event) => any;
    onerror?: (this: this, event: SensorErrorEvent) => any;
    onreading?: (this: this, event: Event) => any;

    start(): void;
    stop(): void;
}

interface Window {

    Sensor: typeof Sensor;
    SensorErrorEvent: typeof SensorErrorEvent;
}
