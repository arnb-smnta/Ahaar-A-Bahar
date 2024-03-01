// app.js
import postgres from "postgres";
import {
  postgres_DB_name,
  postgres_url,
  postgres_user,
  postgres_password,
  postgres_endpoint_id,
} from "../utils/envFiles.js";

const PGDATABASE = decodeURIComponent(postgres_DB_name);
console.log(postgres_DB_name);
const sql = postgres({
  host: postgres_url,
  database: PGDATABASE,
  username: postgres_user,
  password: postgres_password,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${postgres_endpoint_id}`,
  },
});

const getPgVersion = async () => {
  try {
    const result = await sql`select version()`;
    console.log("Post gres connection  success", result);
  } catch (error) {
    console.log("postgres connection error", error);
    process.exit(1);
  }
};

export default getPgVersion;
