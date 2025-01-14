import { CommandBus } from "@nestjs/cqrs";
import { Test, TestingModule } from "@nestjs/testing";

import { LoginRequest } from "@Application/features/auth/commands/login/login.dto";

import { AuthController } from "./";

describe("AuthController", () => {
  let controller: AuthController;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("login", () => {
    it("should call the command bus with the correct request", async () => {
      const loginRequest: LoginRequest = {
        email: "test-username@example.com",
        password: "test-password",
      };

      await controller.login(loginRequest);

      expect(commandBus.execute).toHaveBeenCalledTimes(1);
      expect(commandBus.execute).toHaveBeenCalledWith(loginRequest);
    });

    it("should throw an error for invalid email", async () => {
      const loginRequest: LoginRequest = {
        email: "invalid-email",
        password: "test-password",
      };

      await expect(controller.login(loginRequest)).rejects.toThrow();
    });
  });
});
