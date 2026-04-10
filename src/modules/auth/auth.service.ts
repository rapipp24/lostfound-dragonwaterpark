import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'; 
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    // inject prismaservice ke constructor
    constructor(private prisma: PrismaService) {}

    // buat fungsi untuk registrasi.
    // pakai async karna menunggu proses bcrypt
    async register(data: RegisterDto) {

        const userExists = await this.prisma.user.findUnique({
            where: {email: data.email}
        });

        if(userExists) {
            throw new BadRequestException('Email sudah terdaftar');
        }

        const salt = await bcrypt.genSalt(10);
        //hasing password pakai salt
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // cari ID untuk role "USER" (asumsi pendaftar baru adalah USER)
        const userRole = await this.prisma.role.findUnique({
            where: {namaRole: 'USER'}
        });

        if (!userRole) {
            throw new BadRequestException('Role default USER tidak ditemukan dalam database');
        }

        // masukan data ke database
        const newUser = await this.prisma.user.create({
            data : {
                nama : data.nama,
                email: data.email,
                password: hashedPassword,
                roleId: userRole.roleId
            }
        });

        return {
            id : newUser.id,
            nama : data.nama,
            email : data.email,
            password : hashedPassword,
            pesan : 'Registrasi berhasil!'
        };
    }
}
