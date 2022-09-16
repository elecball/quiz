const UserStorage = require("./UserStorage");


class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const { id, password } = await UserStorage.getUserInfo(this.body.id);
        if (id) {
            if (id === this.body.id && password == this.body.password) {
                return { success: true };
            }
            return { success: false, msg: "wrong password" };
        }
        return { success: false, msg: "id not existed" };
    }

    async register() {
        return await UserStorage.save(this.body);
    }
}

module.exports = User;