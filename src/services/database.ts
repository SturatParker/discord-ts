import Mongoose, { ConnectionOptions, Connection } from 'mongoose';

export class DataService {
  private _connectOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  constructor() {
    this.connection.once('open', () => {
      console.log(
        `Database connected: ${this.connection.host}/${this.connection.name}`
      );
    });
  }

  connect(uri: string): Promise<Connection> {
    if (this.connection.readyState == 1) {
      return Promise.resolve<Connection>(this.connection);
    }
    return Mongoose.connect(uri, this._connectOptions).then(
      () => this.connection
    );
  }

  async connectAsync(uri: string): Promise<Connection> {
    if (this.connection.readyState == 1) {
      return this.connection;
    }
    return (await Mongoose.connect(uri, this._connectOptions)).connection;
  }

  disconnect(): Promise<void> {
    return Mongoose.disconnect();
  }

  get connection() {
    return Mongoose.connection;
  }
}

export const DATABASE_SERVICE = new DataService();
