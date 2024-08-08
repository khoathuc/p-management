export class User {
    email?: string;
    username?: string;
    password?: string;

    constructor({ email, username, password }) {
        if (email != null) this.email = email;
        if (username != null) this.username = username;
        if (password != null) this.password = password;
    }
}