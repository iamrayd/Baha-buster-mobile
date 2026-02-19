import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export interface ForecastDay {
  day: string;
  icon: 'sun' | 'cloud' | 'cloud-rain' | 'cloud-drizzle';
  temperature: number;
  rainfall: number;
}

interface WeatherForecastCardProps {
  forecast: ForecastDay[];
  onViewMore?: () => void;
}

export const WeatherForecastCard: React.FC<WeatherForecastCardProps> = ({
  forecast,
  onViewMore,
}) => {
  const getWeatherIcon = (icon: string) => {
    return icon as any; // Type assertion for Feather icon names
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.header}
        activeOpacity={0.7}
        onPress={onViewMore}
      >
        <View style={styles.headerLeft}>
          <Feather name="clock" size={18} color={COLORS.primary} />
          <Text style={styles.title}>3-Day Weather Forecast</Text>
        </View>
        <Feather name="chevron-right" size={18} color={COLORS.textLight} />
      </TouchableOpacity>

      <View style={styles.forecastContainer}>
        {forecast.map((day, index) => (
          <View 
            key={index} 
            style={[
              styles.dayCard,
              index === 0 && styles.todayCard
            ]}
          >
            <Text style={[
              styles.dayLabel,
              index === 0 && styles.todayLabel
            ]}>
              {day.day}
            </Text>
            
            <View style={styles.iconContainer}>
              <Feather 
                name={getWeatherIcon(day.icon)} 
                size={32} 
                color={index === 0 ? COLORS.textLight : COLORS.textMedium} 
              />
            </View>
            
            <Text style={[
              styles.temperature,
              index === 0 && styles.todayTemp
            ]}>
              {day.temperature}°C
            </Text>
            
            <View style={styles.rainfallContainer}>
              <Feather 
                name="droplet" 
                size={12} 
                color={COLORS.riskMedium} 
              />
              <Text style={styles.rainfall}>{day.rainfall}%</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  dayCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  todayCard: {
    backgroundColor: COLORS.gray100,
  },
  dayLabel: {
    color: COLORS.textMedium,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  todayLabel: {
    color: COLORS.textDark,
    fontWeight: '600',
  },
  iconContainer: {
    marginBottom: 12,
  },
  temperature: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  todayTemp: {
    fontSize: 18,
  },
  rainfallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rainfall: {
    color: COLORS.riskMedium,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});