import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
.setEndpoint('https://cloud.appwrite.io/v1')
// Appwrite Cloud endpoint
    .setProject('66fa9856001dec597c51');  
           // Your actual Project ID

           export const account = new Account(client);

const databases = new Databases(client);

export { client, databases };
