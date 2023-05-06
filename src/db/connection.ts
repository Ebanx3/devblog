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
            console.log('Conectado a base de datos MongoAtlas')
        }
        catch (error) {
            console.log(error);
        }
    }

}

export default Connection;