import { HealthController } from "../../controllers/health.controller";
import { HealthRepository } from "../../repositories/health.repository";
import { HealthService } from "../../services/health.service";

const healthRepository = new HealthRepository();
const healthService = new HealthService(healthRepository);
const healthController = new HealthController(healthService);

export { healthController };
