export class User {
    constructor(
        public email: string,
        public password: string,
        public authenticated: boolean,
        public jwt: string
    ) { }
}
