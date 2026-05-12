import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('claims')
@UseGuards(AuthGuard('jwt'))
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  create(@Body() createClaimDto: CreateClaimDto) {
    return this.claimsService.create(createClaimDto);
  }

  @Get()
  findAll() {
    return this.claimsService.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.claimsService.updateStatus(+id, status);
  }
}
