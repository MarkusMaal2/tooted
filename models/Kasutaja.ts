export class Kasutaja {
    constructor (
        private _id: number,
        private firstname: string,
        private lastname: string,
        private passwd: string
    ){}

    get id() {
        return this._id
    }

    get fname() {
        return this.firstname
    }

    get lname() {
        return this.lastname
    }

    get password() {
        return this.passwd
    }

    set fname(newName: string) {
        this.firstname = newName
    }

    set lname(newName: string) {
        this.lastname = newName
    }

    set password(newPass: string) {
        this.passwd = newPass
    }

}