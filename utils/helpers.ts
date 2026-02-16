import { RiskLevel } from '../constants/types';

/**
 * Get greeting based on current time of day
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Good Morning!';
  } else if (hour < 18) {
    return 'Good Afternoon!';
  } else {
    return 'Good Evening!';
  }
};

/**
 * Get color class for risk level
 */
export const getRiskColor = (level: RiskLevel): string => {
  switch (level) {
    case 'low':
      return 'bg-risk-low';
    case 'medium':
      return 'bg-risk-medium';
    case 'high':
      return 'bg-risk-high';
    default:
      return 'bg-gray-400';
  }
};

/**
 * Get text color class for risk level
 */
export const getRiskTextColor = (level: RiskLevel): string => {
  switch (level) {
    case 'low':
      return 'text-risk-low';
    case 'medium':
      return 'text-risk-medium';
    case 'high':
      return 'text-risk-high';
    default:
      return 'text-gray-400';
  }
};

/**
 * Format timestamp to readable format
 */
export const formatTimestamp = (timestamp: string): string => {
  // For now, return as is. Will enhance with date-fns later if needed
  return timestamp;
};