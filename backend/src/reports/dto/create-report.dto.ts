import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty({ message: 'Nama barang tidak boleh kosong' })
  @IsString()
  item: string;

  @IsNotEmpty({ message: 'Lokasi tidak boleh kosong' })
  @IsString()
  location: string;

  @IsNotEmpty({ message: 'Deskripsi tidak boleh kosong' })
  @IsString()
  description: string;
}
