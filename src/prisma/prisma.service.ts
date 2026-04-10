import "dotenv/config";
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor() {
        // init adapter untuk prisma 7
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
        const adapter = new PrismaPg(pool);

        // Suply adapter ke parent class (prisma client)
        super ({ adapter})
    }

    // fungsi untuk connect database
    async onModuleInit() {
        await this.$connect();
        console.log(' Database Berhasil Terhubung');

        // seeding data role
        await this.seedRoles();
    }

    async seedRoles() {
        const roles = ['ADMIN', 'USER'];

        for (const roleName of roles){
            const existing = await this.role.findUnique({
                where: {namaRole: roleName}
            });
            if (!existing) {
                try {
                    await this.role.create({ data: { namaRole: roleName } });
                } catch (e) {
                    // safe to ignore if already exists
                }
            }
        }
        console.log('Role Seed Berhasil');
    }
    
    // fungsi untuk disconnect databse
    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Database Dihentikan');
    }
}