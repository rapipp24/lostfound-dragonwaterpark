import { IsEmail, IsString,IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    nama: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, {message: 'Password minimal 8 karakter'})
    password: string;
}
