const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export interface BarangayFloodData {
  barangayName: string;
  riskLevel: 'none' | 'low' | 'medium' | 'high';
  floodDepth?: number;
  rainfall?: number;
  lastUpdated?: string;
  forecast?: {
    day: string;
    temperature: number;
    rainfall: number;
    condition: string;
  }[];
}

export interface FloodApiResponse {
  barangays: BarangayFloodData[];
  timestamp: string;
}

/**
 * Fetch all barangay flood data from API
 */
export async function fetchAllFloodData(): Promise<FloodApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/forecasts/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      barangays: data,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ Failed to fetch flood data:', error);
    throw error;
  }
}

/**
 * Fetch specific barangay flood data
 */
export async function fetchBarangayData(barangayName: string): Promise<BarangayFloodData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/forecasts/barangay/${encodeURIComponent(barangayName)}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Failed to fetch data for ${barangayName}:`, error);
    return null;
  }
}

/**
 * Convert API response to risk level map for barangayData.ts
 */
export function convertToRiskMap(apiResponse: FloodApiResponse): Record<string, 'none' | 'low' | 'medium' | 'high'> {
  const riskMap: Record<string, 'none' | 'low' | 'medium' | 'high'> = {};
  
  apiResponse.barangays.forEach(barangay => {
    riskMap[barangay.barangayName] = barangay.riskLevel;
  });
  
  return riskMap;
}