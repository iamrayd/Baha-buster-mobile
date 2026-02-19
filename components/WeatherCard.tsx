import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WeatherData } from '../constants/types';
import { COLORS } from '../constants/colors';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Feather name="cloud" size={24} color={COLORS.primary} />
        <View style={styles.headerText}>
          <Text style={styles.condition}>{weather.condition}</Text>
          <Text style={styles.temperature}>{weather.temperature}°C</Text>
        </View>
      </View>
      
      <View style={styles.metricsContainer}>
        {/* Rainfall */}
        <View style={styles.metric}>
          <View style={[styles.metricIcon, { backgroundColor: COLORS.blue }]}>
            <Feather name="droplet" size={16} color={COLORS.white} />
          </View>
          <Text style={styles.metricLabel}>Rainfall</Text>
          <Text style={styles.metricValue}>{weather.rainfall}%</Text>
        </View>

        {/* Humidity */}
        <View style={styles.metric}>
          <View style={[styles.metricIcon, { backgroundColor: COLORS.purple }]}>
            <Feather name="activity" size={16} color={COLORS.white} />
          </View>
          <Text style={styles.metricLabel}>Humidity</Text>
          <Text style={styles.metricValue}>{weather.humidity}%</Text>
        </View>

        {/* Wind Speed */}
        <View style={styles.metric}>
          <View style={[styles.metricIcon, { backgroundColor: COLORS.cyan }]}>
            <Feather name="wind" size={16} color={COLORS.white} />
          </View>
          <Text style={styles.metricLabel}>Wind</Text>
          <Text style={styles.metricValue}>{weather.windSpeed} km/h</Text>
        </View>
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
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  condition: {
    color: COLORS.textDark,
    fontSize: 18,
    fontWeight: '600',
  },
  temperature: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: 'bold',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    color: COLORS.textLight,
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: '600',
  },
});