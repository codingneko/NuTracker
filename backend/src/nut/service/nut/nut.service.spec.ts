import { Test, TestingModule } from '@nestjs/testing';
import { NutService } from './nut.service';

describe('NutService', () => {
  let service: NutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NutService],
    }).compile();

    service = module.get<NutService>(NutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
