export interface UberRepository {
  availableOne(): Promise<string | undefined>;
}
