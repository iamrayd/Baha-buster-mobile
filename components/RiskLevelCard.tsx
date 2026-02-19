import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RiskLevelInfo } from '../constants/types';
import { COLORS } from '../constants/colors';
import { getRiskColor } from '../utils/helpers';

interface RiskLevelCardProps {
  riskInfo: RiskLevelInfo;
  onPress?: () => void;
}

export const RiskLevelCard: React.FC<RiskLevelCardProps> = ({ riskInfo, onPress }) => {
  const backgroundColor = getRiskColor(riskInfo.level);
  
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor }]} 
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Current Risk Level</Text>
        <Text style={styles.time}>{riskInfo.lastUpdated}</Text>
      </View>
      
      <View style={styles.levelContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{riskInfo.level.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.message}>{riskInfo.message}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
  },
  levelContainer: {
    marginBottom: 12,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 20,
  },
});