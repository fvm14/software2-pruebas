import { Simulacro } from '../entities/Simulacro';

export interface SimulacroRepository {
  save(simulacro: Simulacro): Promise<Simulacro>;
}
