import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchAllFloodData, FloodApiResponse, convertToRiskMap } from '../services/floodApi';
import { loadFromCache, saveToCache } from '../services/cacheManager';
import { barangayPolygons, setRiskLevelsFromAPI } from '../constants/barangayData';

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

interface UseFloodDataReturn {
  data: FloodApiResponse | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useFloodData(): UseFloodDataReturn {
  const [data, setData] = useState<FloodApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const loadData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      // Try to load from cache first (instant UI)
      const cachedData = await loadFromCache();
      if (cachedData && isMountedRef.current) {
        setData(cachedData);
        setLastUpdated(new Date(cachedData.timestamp));
        
        // Update barangay polygons with cached risk levels
        const riskMap = convertToRiskMap(cachedData);
        setRiskLevelsFromAPI(riskMap);
        
        if (showLoading) {
          setLoading(false);
        }
      }

      // Fetch fresh data from API
      const freshData = await fetchAllFloodData();
      
      if (isMountedRef.current) {
        setData(freshData);
        setLastUpdated(new Date(freshData.timestamp));
        
        // Update barangay polygons with fresh risk levels
        const riskMap = convertToRiskMap(freshData);
        setRiskLevelsFromAPI(riskMap);
        
        // Save to cache
        await saveToCache(freshData);
        
        setLoading(false);
      }
    } catch (err) {
      console.error('Failed to load flood data:', err);
      
      if (isMountedRef.current) {
        // Only show error if we have no cached data
        if (!data) {
          setError('Unable to connect to the API server.');
        }
        setLoading(false);
      }
    }
  }, [data]);

  const refresh = useCallback(async () => {
    await loadData(false);
  }, [loadData]);

  useEffect(() => {
    isMountedRef.current = true;

    // Initial load
    loadData();

    // Set up auto-refresh interval
    intervalRef.current = setInterval(() => {
      loadData(false); // Background refresh, don't show loading
    }, REFRESH_INTERVAL);

    // Cleanup
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loadData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
  };
}