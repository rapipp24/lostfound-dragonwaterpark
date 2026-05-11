import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty({ message: 'Judul barang tidak boleh kosong' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Deskripsi tidak boleh kosong' })
  @IsString()
  description: string;
}
