export default class User {
    public id: number;
    public username: string;
    public avatar: string;
    public email: string;

    constructor() {
        this.id = 0;
        this.username = 'Anonymous';
        this.avatar = '';
        this.email = '';
    }
}
