import { HealthRepository } from "../repositories/health.repository";

export class HealthService {
  constructor(private readonly healthRepository: HealthRepository) {}

  getHealthStatus() {
    return {
      status: "ok",
      timestamp: this.healthRepository.getTimestamp(),
    };
  }
}
