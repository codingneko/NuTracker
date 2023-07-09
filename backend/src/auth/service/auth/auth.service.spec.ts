import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/auth/dto/LoginDTO.class';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should authenticate users', () => {
    let loginDetails: LoginDTO = {
      username: '',
      password: ''
    };
    expect(service.login(loginDetails));
  })
});
