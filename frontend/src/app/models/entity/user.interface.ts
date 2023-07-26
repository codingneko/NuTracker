export default class User {
    private userId: number;
    private username: string;
    private avatar: string;
    private email: string;

    constructor() {
        this.userId = 0;
        this.username = 'Anonymous';
        this.avatar = '';
        this.email = '';
    }

    public getUsername(): string {
        return this.username;
    }

    public getUserId(): number {
        return this.userId;
    }

    public getAvatar(): string {
        return this.avatar;
    }

    public getEmail(): string {
        return this.email;
    }
}