import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setProject(conf.appwriteProjectId)
            .setEndpoint(conf.appwriteUrl);
        this.account = new Account(this.client);
    }


    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            });
            if (userAccount) {
                this.login({ email, password });
            } else {
                throw new Error("Unable to create account");
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession({
                email: email,
                password: password
            })
            return session;
        } catch (err) {
            throw new Error(err);
        }
    }

    async logout() {
        try {
            const result = await this.account.deleteSessions();
            return result;
        } catch (err) {
            console.log("Appwrite service :: logout :: error", err);
        }
    }

    // Get the currently logged in user. 
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (err) {
            console.log("Appwrite service :: getCurrentUser :: error", err);
        }
        return null;
    }


}


const authService = new AuthService();

export default authService;

