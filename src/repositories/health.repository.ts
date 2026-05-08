export class HealthRepository {
  getTimestamp() {
    return new Date().toISOString();
  }
}
