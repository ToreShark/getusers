import { Module } from '@nestjs/common';
import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocEntity } from './doc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocEntity])],
  controllers: [DocsController],
  providers: [DocsService],
})
export class DocsModule {}
