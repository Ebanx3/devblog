import mongoose from 'mongoose';

const dbConnectionUrl = process.env.DB_CONNECTION_URL || '';

class Connection {
    private static instance: Connection;
    private constructor() {
        this.connectToDB();
    };

    public static getInstance(): Connection {
        if (!Connection.instance) {
            Connection.instance = new Connection();
        }
        return Connection.instance;
    }

    public async connectToDB() {
        try {
            await mongoose.connect(dbConnectionUrl);

        }
        catch (error) {
        }
    }

}

export default Connection;