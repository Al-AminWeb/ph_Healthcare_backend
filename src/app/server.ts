import {Server} from 'http';
import app from "./app.js";
import seedSuperAdmin from "../helpers/seedSuperAdmin.js";


async function bootstrap() {

    let server: Server | null = null;

    try {
        await seedSuperAdmin();
        server = app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    } catch (error) {
        console.error("Failed to start server:", error)
    }
}

await bootstrap();