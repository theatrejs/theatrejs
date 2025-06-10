interface AccelerometerOptions {

    frequency?: number;
    referenceFrame?: 'device' | 'screen';
}

declare class Accelerometer extends Sensor {

    readonly x?: number;
    readonly y?: number;
    readonly z?: number;

    constructor(options?: AccelerometerOptions);
}

interface Window {

    Accelerometer: typeof Accelerometer;
}
