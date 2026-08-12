import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow the frontend + admin (different subdomains) to call the API.
  const frontendUrl = process.env.FRONTEND_URL;
  const adminUrl = process.env.ADMIN_URL;

  if (process.env.NODE_ENV === "production" && !frontendUrl && !adminUrl) {
    throw new Error("FRONTEND_URL or ADMIN_URL must be set in production");
  }

  const allowedOrigins = [frontendUrl, adminUrl].filter(Boolean) as string[];

  app.enableCors({ 
    origin: allowedOrigins.length > 0 ? allowedOrigins : true, 
    credentials: true 
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT || process.env.API_PORT || 4000;
  await app.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`NoLoop backend listening on port ${port}`);
}

bootstrap();
