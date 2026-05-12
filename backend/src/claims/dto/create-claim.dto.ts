import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateClaimDto {
  @IsNotEmpty()
  @IsString()
  claimerName: string;

  @IsNotEmpty()
  @IsString()
  claimerPhone: string;

  @IsNotEmpty()
  @IsNumber()
  reportId: number;
}
