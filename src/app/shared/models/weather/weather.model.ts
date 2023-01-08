export class Weather {

    constructor(
        private _temperature: number,
        private _weathercode: string,
        private _time: Date
    ) {}

    public get temperature(): number {
        return this._temperature;
    }
    public set temperature(value: number) {
        this._temperature = value;
    }
    public get weathercode(): string {
        return this._weathercode;
    }
    public set weathercode(value: string) {
        this._weathercode = value;
    }
    public get time(): Date {
        return this._time;
    }
    public set time(value: Date) {
        this._time = value;
    }
}
