export class User {
    constructor(
        public email: string,
        public id: string,
        public password: string,
        public authenticated: boolean,
        public jwt: string
    ) { }
}
