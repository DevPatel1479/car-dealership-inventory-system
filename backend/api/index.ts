import app from '../src/app.js';
import { connectDatabase } from '../src/config/database.js';

export default async function handler(
    req: any,
    res: any,
) {
    await connectDatabase();

    return app(req, res);
}