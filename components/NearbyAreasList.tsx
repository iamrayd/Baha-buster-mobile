import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface NearbyArea {
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface NearbyAreasListProps {
  areas: NearbyArea[];
  showMoreCount?: number;
}

export const NearbyAreasList: React.FC<NearbyAreasListProps> = ({ 
  areas, 
  showMoreCount 
}) => {
  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return COLORS.riskLow;
      case 'medium': return COLORS.riskMedium;
      case 'high': return COLORS.riskHigh;
    }
  };

  const getRiskLabel = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return 'Safe';
      case 'medium': return 'Moderate risk';
      case 'high': return 'High risk';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Areas</Text>
      
      {areas.map((area, index) => (
        <View key={index} style={styles.areaRow}>
          <View style={[styles.dot, { backgroundColor: getRiskColor(area.riskLevel) }]} />
          <Text style={styles.areaName}>{area.name}</Text>
          <Text style={[styles.riskLabel, { color: getRiskColor(area.riskLevel) }]}>
            {getRiskLabel(area.riskLevel)}
          </Text>
        </View>
      ))}
      
      {showMoreCount && showMoreCount > 0 && (
        <Text style={styles.moreText}>+{showMoreCount} more areas</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    color: COLORS.textDark,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  areaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  areaName: {
    flex: 1,
    color: COLORS.textDark,
    fontSize: 14,
  },
  riskLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  moreText: {
    color: COLORS.textLight,
    fontSize: 12,
    marginTop: 4,
  },
});