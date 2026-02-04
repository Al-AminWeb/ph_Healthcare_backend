import { prisma } from "../shared/prisma.js";
import { UserRole } from "../generated/prisma/enums.js";
import bcrypt from "bcryptjs";


const getSuperAdminCredentials = () => {
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    const name = process.env.SUPER_ADMIN_NAME || "super admin";
    const contactNumber =
        process.env.SUPER_ADMIN_CONTACT_NUMBER || "0000000000";

    if (!email || !password) {
        throw new Error("SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD is missing");
    }

    if (password.length < 8) {
        throw new Error(
            "SUPER_ADMIN_PASSWORD must be at least 8 characters long"
        );
    }

    return {
        email,
        password,
        name,
        contactNumber,
    };
};

const seedSuperAdmin = async (): Promise<void> => {
    try {
        const credentials = getSuperAdminCredentials();

        const existingSuperAdmin = await prisma.user.findFirst({
            where: {
                role: UserRole.ADMIN,
            },
        });

        if (existingSuperAdmin) {
            console.log("Super Admin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const superAdmin = await prisma.user.create({
            data: {
                email: credentials.email,
                password: hashedPassword,
                role: UserRole.ADMIN,
                admin: {
                    create: {
                        email: credentials.email,
                        name: credentials.name,
                        contactNumber: credentials.contactNumber,
                    },
                },
            },
            select: {
                id: true,
                email: true,
                role: true,
            },
        });

        console.log(
            `Super Admin created with email: ${superAdmin.email}`
        );
    } catch (error) {
        // const errorMessage =
        //     error instanceof Error ? error.message : string(error);

        console.error("Error seeding super admin:", error);


    }
};

export default seedSuperAdmin;
