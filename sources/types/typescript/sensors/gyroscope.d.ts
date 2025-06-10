interface GyroscopeOptions {

    frequency?: number;
    referenceFrame?: 'device' | 'screen';
}

declare class Gyroscope extends Sensor {

    readonly x?: number;
    readonly y?: number;
    readonly z?: number;

    constructor(options?: GyroscopeOptions);
}

interface Window {

    Gyroscope: typeof Gyroscope;
}
