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


export const formatTime = (date: Date = new Date()): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};


export const getRiskColor = (level: 'low' | 'medium' | 'high'): string => {
  const colors = {
    low: '#48bb78',
    medium: '#ed8936',
    high: '#e53e3e',
  };
  return colors[level];
};