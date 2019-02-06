export interface EnergyForecast {
    unit: string;
    forecast?: (ForecastEntity)[] | null;
  }
  export interface ForecastEntity {
    timestamp: number;
    value: number;
  }
  