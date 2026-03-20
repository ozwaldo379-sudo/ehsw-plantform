import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getCertificateState } from "../src/lib/certificates";
import {
  generateCertificateQR,
  generateQrBase64,
  writeQrToLocalFile,
} from "../src/lib/qr";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  const adminEmail = (
    process.env.ADMIN_EMAIL ??
    process.env.ADMIN_USERNAME ??
    "admin@ehsw2.com"
  )
    .trim()
    .toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Ehsw2Admin2025!";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      name: "Administrador EHSW²",
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Administrador EHSW²",
    },
  });

  console.log(`✔ Admin listo: ${adminEmail}`);

  const legacyCleanupFolios = [
    "DEMO-2213050039",
    "EHSW-2026-FUM-004",
    "EHSW-2026-GEN-001",
    "EHSW-2026-GEN-002",
    "EHSW-2026-GEN-003",
    "EHSW-2026-GEN-004",
  ];

  await prisma.certificate.deleteMany({
    where: {
      folio: { in: legacyCleanupFolios },
    },
  });

  const certificates = [
    {
      folio: "EHSW-2026-FUM-001",
      company: "CLIENTE DEMO S.A. DE C.V.",
      clientName: "CLIENTE DEMO S.A. DE C.V.",
      address: "Puebla, Puebla",
      serviceType: "CONTROL DE PLAGAS",
      chemicalUsed: "PRODUCTO QUÍMICO DEMO",
      issueDate: new Date("2026-03-15"),
      expirationDate: new Date("2027-03-15"),
      notes: "Certificado demo vigente para pruebas del sistema.",
    },
    {
      folio: "EHSW-2026-FUM-002",
      company: "INDUSTRIAS EJEMPLO S.A. DE C.V.",
      clientName: "INDUSTRIAS EJEMPLO S.A. DE C.V.",
      address: "Ciudad de México",
      serviceType: "CONTROL DE PLAGAS",
      chemicalUsed: "GEL CUCARACHICIDA",
      issueDate: new Date("2026-01-01"),
      expirationDate: new Date("2026-12-31"),
      notes: "Certificado demo vigente.",
    },
    {
      folio: "EHSW-2026-FUM-003",
      company: "RESTAURANTE MUESTRA S.A. DE C.V.",
      clientName: "RESTAURANTE MUESTRA S.A. DE C.V.",
      address: "Puebla, Puebla",
      serviceType: "DESINFECCIÓN",
      chemicalUsed: "DESINFECTANTE HOSPITALARIO",
      issueDate: new Date("2024-01-15"),
      expirationDate: new Date("2025-01-15"),
      notes: "Certificado demo vencido para pruebas del landing.",
    },
    {
      folio: "EHSW-2026-EXT-001",
      company: "FÁBRICA MODELO S.A. DE C.V.",
      clientName: "FÁBRICA MODELO S.A. DE C.V.",
      address: "Estado de México",
      serviceType: "EXTINTORES",
      chemicalUsed: "RECARGA PQS 6KG",
      issueDate: new Date("2025-04-10"),
      expirationDate: new Date("2026-04-10"),
      notes: "Certificado demo por vencer.",
    },
    {
      folio: "EHSW-2026-SEG-001",
      company: "CORPORATIVO CENTRO S.A. DE C.V.",
      clientName: "CORPORATIVO CENTRO S.A. DE C.V.",
      address: "Monterrey, Nuevo León",
      serviceType: "SEGURIDAD INDUSTRIAL",
      chemicalUsed: "CAPACITACIÓN DC-3",
      issueDate: new Date("2026-06-30"),
      expirationDate: new Date("2027-06-30"),
      notes: "Certificado demo vigente para seguridad industrial.",
    },
  ];

  for (const cert of certificates) {
    const qrBase64 = await generateQrBase64(cert.folio);
    const qrCodeUrl = await generateCertificateQR(cert.folio);

    await writeQrToLocalFile(cert.folio, qrBase64);

    await prisma.certificate.upsert({
      where: { folio: cert.folio },
      update: {
        ...cert,
        status: getCertificateState(cert.expirationDate),
        qrCodeUrl,
        qrBase64,
      },
      create: {
        ...cert,
        status: getCertificateState(cert.expirationDate),
        qrCodeUrl,
        qrBase64,
      },
    });

    console.log(`  ✔ Certificado ${cert.folio} listo`);
  }

  console.log(`✔ Seed completado con ${certificates.length} certificados demo.`);
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
