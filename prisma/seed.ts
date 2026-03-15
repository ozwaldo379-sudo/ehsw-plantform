import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateCertificateQR } from "../src/lib/qr";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding started...");

    // 1. Create Demo Admin
    const adminEmail = "admin@ehsw2.com";
    const hashedPassword = await bcrypt.hash("Admin123!", 10);

    await prisma.user.upsert({
        where: { email: adminEmail },
        update: { password: hashedPassword },
        create: {
            email: adminEmail,
            password: hashedPassword,
            name: "Admin Demo",
        },
    });
    console.log("✔ Admin user created: admin@ehsw2.com / Admin123!");

    // 2. Clear existing certificates to avoid folio conflicts in demo
    await prisma.certificate.deleteMany({});

    // 3. Create requested demo certificates
    const certificates = [
        {
            folio: "EHSW-2026-FUM-001",
            company: "FarmaMedic Norte",
            address: "Av. Universidad 123, CDMX",
            serviceType: "Control de Plagas",
            chemicalUsed: "Deltametrina 2.5% CE",
            clientName: "Juan Pérez",
            issueDate: new Date("2026-03-01"),
            expirationDate: new Date("2026-09-01"),
            status: "VALID",
        },
        {
            folio: "EHSW-2026-FUM-002",
            company: "Hospital San Lucas",
            address: "Calle Dr. Galvez 45, CDMX",
            serviceType: "Gestión Ambiental",
            chemicalUsed: "Hipoclorito de Sodio 6%",
            clientName: "Laura Ramírez",
            issueDate: new Date("2026-03-05"),
            expirationDate: new Date("2027-03-05"),
            status: "VALID",
        },
        {
            folio: "EHSW-2026-FUM-003",
            company: "Planta Industrial Atlas",
            address: "Zona Industrial Vallejo",
            serviceType: "Seguridad Industrial",
            chemicalUsed: "Polvo Químico Seco ABC",
            clientName: "Carlos Mendoza",
            issueDate: new Date("2026-01-10"),
            expirationDate: new Date("2026-07-10"),
            status: "VALID",
        },
        {
            folio: "DEMO-2213050039",
            company: "CLIENTE DEMO S.A. DE C.V.",
            address: "CALLE TEMPORAL #123, PUEBLA",
            serviceType: "CONTROL DE PLAGAS",
            chemicalUsed: "PRODUCTO QUÍMICO DEMO",
            clientName: "ADMINISTRACIÓN",
            issueDate: new Date(),
            expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            status: "VALID",
        },
    ];

    for (const cert of certificates) {
        // Generate QR code for each certificate
        const qrCodeUrl = await generateCertificateQR(cert.folio);
        await prisma.certificate.create({
            data: { ...cert, qrCodeUrl },
        });
        console.log(`  ✔ Certificate ${cert.folio} created with QR`);
    }

    console.log(`✔ Seeded ${certificates.length} certificates.`);
    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
