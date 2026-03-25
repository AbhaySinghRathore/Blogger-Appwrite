import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
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
                await this.login({ email, password });
                return userAccount;
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
            return await this.account.get();
        } catch (err) {
            // Only log unexpected errors
            if (err.code !== 401) {
                console.log("Unexpected error:", err);
            }
            return null;
        }
    }
}


const authService = new AuthService();

export default authService;

