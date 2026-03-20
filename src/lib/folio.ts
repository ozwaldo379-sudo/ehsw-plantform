import { prisma } from "./prisma";

const SERVICE_CODES: Record<string, string> = {
    "Fumigación": "FUM",
    "Control de Plagas": "FUM",
    "Desinfección": "DES",
    "Extintores": "EXT",
    "Seguridad Industrial": "SEG",
    "Gestión Ambiental": "AMB",
    "Protección Civil": "PC",
};

export function getServiceCode(serviceType: string): string {
    // Try exact match first
    if (SERVICE_CODES[serviceType]) return SERVICE_CODES[serviceType];

    // Try partial match
    const key = Object.keys(SERVICE_CODES).find((k) =>
        serviceType.toLowerCase().includes(k.toLowerCase())
    );
    return key ? SERVICE_CODES[key] : "GEN";
}

export async function generateFolio(serviceType: string): Promise<string> {
    const year = new Date().getFullYear();
    const code = getServiceCode(serviceType);

    // Count existing certificates of same type and year
    const count = await prisma.certificate.count({
        where: {
            folio: {
                startsWith: `EHSW-${year}-${code}`,
            },
        },
    });

    const nextNum = (count + 1).toString().padStart(3, "0");
    return `EHSW-${year}-${code}-${nextNum}`;
}
