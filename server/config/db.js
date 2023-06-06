import { connect } from "mongoose"
import { config } from "dotenv"

config();

const URI = process.env.MONGO_URI

export const connectDB = async () => {
  try {
    const connection = await connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `MongoDB connected successfully at ${connection.connection.host}...`
    );
  } catch (err) {
    console.error(`Error connecting to MongoDB - ${err.message}`);
    process.exit(1);
  }
};