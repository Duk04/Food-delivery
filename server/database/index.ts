import { connect } from "mongoose";

export const connectDatabase = async () => {
  const dbConnectionString = process.env.DB_CONNECTION_URL;
  if (!dbConnectionString) throw new Error("Failed to connect to the MongoDB");
  try {
    await connect(dbConnectionString);

    console.log("Successfully conected to the MongoDB");
  } catch (error) {
    console.error(error instanceof Error && error.message);
  }
};
