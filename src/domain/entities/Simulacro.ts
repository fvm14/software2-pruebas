export class Simulacro {
  constructor(
    public readonly userId: string,
    public readonly area: string,
    public readonly startTime: Date,
    public readonly endTime: Date | null,
    public readonly id?: string // 👈 opcional
  ) {}

  static crear(userId: string, area: string): Simulacro {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 120 * 60000); // +120 min
    return new Simulacro(userId, area, startTime, endTime);
  }
}
