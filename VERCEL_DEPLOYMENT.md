# Guía de Despliegue en Vercel (EHSW²)

La plataforma ha sido configurada para ser desplegada en **Vercel** usando **Vercel Postgres** como base de datos de producción.

## Pasos para el Despliegue

### 1. Preparar el Repositorio
Sube este código fuente a un repositorio en GitHub, GitLab o Bitbucket.

### 2. Crear Proyecto en Vercel
1. Ve a tu panel de control en [Vercel](https://vercel.com/dashboard).
2. Haz clic en **Add New** > **Project**.
3. Importa tu repositorio de EHSW².
4. En la sección **Build and Output Settings**, Vercel detectará automáticamente que es un proyecto de Next.js. El comando de compilación ha sido sobreescrito en `package.json` para ejecutar la migración de la base de datos automáticamente (`prisma db push && next build`).

### 3. Configurar la Base de Datos (Vercel Postgres)
Antes de darle a "Deploy", necesitamos una base de datos.
1. Haz clic en la pestaña **Storage** de Vercel.
2. Crea una nueva base de datos **Postgres** y asígnala al proyecto.
3. Vercel inyectará automáticamente las variables de entorno relacionadas con la base de datos (incluyendo `POSTGRES_PRISMA_URL` y `POSTGRES_URL_NON_POOLING`).
4. **Importante:** Vercel añade `POSTGRES_PRISMA_URL`, pero `schema.prisma` busca `DATABASE_URL`. Asegúrate de mapearlo en Configuración > Variables de Entorno, o cambiar en `schema.prisma` `env("DATABASE_URL")` por `env("POSTGRES_PRISMA_URL")`. 
*(Por defecto, Vercel mapea `DATABASE_URL` para Prisma si usas la integración oficial).*

### 4. Variables de Entorno Adicionales
En la configuración del proyecto en Vercel, ve a **Settings** > **Environment Variables** y añade las siguientes variables copiándolas de tu archivo `.env`:

*   `ADMIN_USERNAME`: Tu usuario de administrador (ej. `admin@ehsw2.com`)
*   `ADMIN_PASSWORD`: Tu contraseña segura (ej. `Admin123!`)
*   `JWT_SECRET`: Una cadena de texto secreta y larga para firmar las sesiones.
*   `NEXT_PUBLIC_SITE_URL`: La URL pública de tu aplicación en Vercel (la configurarás una vez desplegada, por ejemplo `https://ehsw2.vercel.app`).

### 5. Desplegar (Deploy)
Haz clic en **Deploy**. 

Vercel instalará las dependencias, ejecutará `prisma generate` (para crear el cliente nativo), luego `prisma db push` (para sincronizar tu esquema con la base de datos Postgres recién creada) y finalmente compilará la aplicación de Next.js.

### 6. Popular Datos Iniciales (Seed)
Para tener el certificado demo inicial en la base de datos de producción:
1. Asegúrate de tener `Vercel CLI` instalado (`npm i -g vercel`).
2. Loguéate (`vercel login`) y vincula el proyecto local (`vercel link`).
3. Descarga las variables de entorno de producción: `vercel env pull .env.production.local`
4. Aplica el seed: `Local/npx dotenv -e .env.production.local -- npx tsx prisma/seed.ts`

¡Listo! La plataforma EHSW² estará ahora ejecutándose globalmente mediante Serverless Functions y una base de datos PostgreSQL resiliente.
