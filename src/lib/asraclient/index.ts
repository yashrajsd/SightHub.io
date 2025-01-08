import { DataAPIClient } from '@datastax/astra-db-ts';

// Astra DB connection details
const client = new DataAPIClient('AstraCS:yHelnbAYwJwrmkaZhJnfHwKF:49b6b23aa0e2a4bea75d9496272e515e0a4122c6977762643898d22c8e33226f');

// Connect to Astra DB
export const connect = async () => {
    const db = client.db('https://3c6c75f7-d234-4b95-ab4c-5aafba4afb9f-us-east-2.apps.astra.datastax.com');

    try {
        const colls = await db.listCollections();
        console.log('Connected to AstraDB:', colls);
    } catch (error) {
        console.error('Error connecting to AstraDB:', error);
    }

    return db;
};
