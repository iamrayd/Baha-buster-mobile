export type RiskLevel = 'low' | 'medium' | 'high';

export interface RiskLevelInfo {
  level: RiskLevel;
  message: string;
  lastUpdated: string;
}

export interface WeatherData {
  condition: string;
  temperature: number;
  rainfall: number;
  humidity: number;
  windSpeed: number;
}

export interface AreaStatus {
  location: string;
  riskLevel: RiskLevel;
  lastUpdated: string;
}