import { User } from "@prisma/client";
import { AppError } from "../errors/app-error";
import { UserRepository } from "../repositories/user.repository";
import { LoginInput, RegisterInput, AuthResponse, AuthUser } from "../types/auth";
import { comparePassword, hashPassword } from "../utils/password";
import { fromPrismaUserRole, toPrismaUserRole } from "../utils/user-role";
import { signAccessToken } from "../utils/jwt";
import { HTTP_STATUS } from "../utils/http-status";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(payload: RegisterInput): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new AppError("Email is already in use.", {
        statusCode: HTTP_STATUS.CONFLICT,
        code: "EMAIL_ALREADY_IN_USE",
        errors: [{ field: "email", message: "Email is already in use." }],
      });
    }

    const hashedPassword = await hashPassword(payload.password);

    const user = await this.userRepository.create({
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      password: hashedPassword,
      role: toPrismaUserRole(payload.role),
    });

    return this.createAuthResponse(user);
  }

  async login(payload: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(payload.email);

    if (!user) {
      throw this.createInvalidCredentialsError();
    }

    const isPasswordValid = await comparePassword(payload.password, user.password);

    if (!isPasswordValid) {
      throw this.createInvalidCredentialsError();
    }

    return this.createAuthResponse(user);
  }

  async getProfile(userId: string): Promise<AuthUser> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found.", {
        statusCode: HTTP_STATUS.NOT_FOUND,
        code: "USER_NOT_FOUND",
      });
    }

    return this.serializeUser(user);
  }

  private createAuthResponse(user: User): AuthResponse {
    return {
      user: this.serializeUser(user),
      accessToken: signAccessToken({
        sub: user.id,
        role: fromPrismaUserRole(user.role),
      }),
    };
  }

  private serializeUser(user: User): AuthUser {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: fromPrismaUserRole(user.role),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  private createInvalidCredentialsError() {
    return new AppError("Invalid email or password.", {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      code: "INVALID_CREDENTIALS",
    });
  }
}
