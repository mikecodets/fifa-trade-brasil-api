import "dotenv/config";
import { cleanEnv, num, port, str } from "envalid";

export const { PORT, JWT_SECRET, BCRYPT_SALT } = cleanEnv(process.env, {
	PORT: port(),
	JWT_SECRET: str(),
	BCRYPT_SALT: num(),
});
