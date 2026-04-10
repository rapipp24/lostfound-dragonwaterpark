import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService], // agar bisa dipakai di module lain
})
export class PrismaModule {}