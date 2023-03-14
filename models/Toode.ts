export class Toode {
    constructor (
        private _id: number,
        private _name: string,
        public price: number,
        public isActive: boolean
    ) {}
    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    set name(newName: string) {
        this._name = newName
    }
}

