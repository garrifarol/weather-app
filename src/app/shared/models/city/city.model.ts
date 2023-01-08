export class City {
 
    // private _id!: string;
    // private _name!: string;
    // private _latitude!: number;
    // private _longitude!: number;
    // private _country!: string;
    // private _country_code!: string;

    constructor(
        private _id: string,
        private _name: string,
        private _latitude: number,
        private _longitude: number,
        private _country: string,
        private _country_code: string,
        private _timezone: string
        // values: any
    ) {
        
        // Object.assign(this, values)
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get latitude(): number {
        return this._latitude;
    }
    public set latitude(value: number) {
        this._latitude = value;
    }
    public get longitude(): number {
        return this._longitude;
    }
    public set longitude(value: number) {
        this._longitude = value;
    }
    public get country(): string {
        return this._country;
    }
    public set country(value: string) {
        this._country = value;
    }
    public get country_code(): string {
        return this._country_code;
    }
    public set country_code(value: string) {
        this._country_code = value;
    }
    public get timezone(): string {
        return this._timezone;
    }
    public set timezone(value: string) {
        this._timezone = value;
    }    
}
    
