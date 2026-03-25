import conf from "../conf/conf.js";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class DBStorageService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const post = await this.databases.createDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteTableId,
                documentId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });
            return post;
        } catch (err) {
            console.log("Appwrite service :: createPost :: error", err);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const result = await this.databases.updateDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteTableId,
                documentId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            });
            return result;
        } catch (err) {
            console.log("Appwrite service :: updatePost :: error", err);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteTableId,
                documentId: slug
            })
            return true;
        } catch (err) {
            console.log("Appwrite service :: deletePost :: error", err);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const result = await this.databases.getDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteTableId,
                documentId: slug
            })
            return result;
        } catch (err) {
            console.log("Appwrite service :: getPost :: error", err);
            return false;
        }
    }

    async getPosts() {
        try {
            const result = await this.databases.listDocuments({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteTableId,
                queries: [
                    Query.equal("status", "active")
                ]
            });
            return result;
        } catch (err) {
            console.log("Appwrite service :: getPosts :: error", err);
            return false;
        }
    }


    // File storage methods
    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            })
        } catch (err) {
            console.log("Appwrite service :: uploadFile :: error", err);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            })
        } catch (err) {
            console.log("Appwrite service :: deleteFile :: error", err);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFileView({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            });
        } catch (err) {
            console.log("Appwrite service :: getFilePreview :: error", err);
            return "";
        }
    }


};

const dbStorageService = new DBStorageService();

export default dbStorageService;