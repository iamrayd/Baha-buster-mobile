import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AreaStatus } from '../constants/types';
import { COLORS } from '../constants/colors';
import { NearbyAreasList } from './NearbyAreasList';

interface NearbyArea {
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface AreaStatusCardProps {
  areaStatus: AreaStatus;
  nearbyAreas?: NearbyArea[];
  showMoreCount?: number;
  onNearbyAreasPress?: () => void;
}

export const AreaStatusCard: React.FC<AreaStatusCardProps> = ({ 
  areaStatus,
  nearbyAreas = [],
  showMoreCount,
  onNearbyAreasPress 
}) => {
  const getBadgeStyle = () => {
    switch (areaStatus.riskLevel) {
      case 'low':
        return { backgroundColor: '#e6fffa', color: COLORS.riskLow };
      case 'medium':
        return { backgroundColor: '#fffaf0', color: COLORS.riskMedium };
      case 'high':
        return { backgroundColor: '#fee', color: COLORS.riskHigh };
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Area Status</Text>
        <View style={[styles.badge, { backgroundColor: badgeStyle.backgroundColor }]}>
          <Text style={[styles.badgeText, { color: badgeStyle.color }]}>
            {areaStatus.riskLevel.toUpperCase()}
          </Text>
        </View>
      </View>
      
      <View style={styles.locationContainer}>
        <Feather name="map-pin" size={18} color={COLORS.textMedium} />
        <Text style={styles.locationText}>{areaStatus.location}</Text>
      </View>

      <Text style={styles.updated}>Last updated: {areaStatus.lastUpdated}</Text>

      {nearbyAreas.length > 0 && (
        <NearbyAreasList 
          areas={nearbyAreas}
          showMoreCount={showMoreCount}
        />
      )}

      <TouchableOpacity 
        style={styles.button} 
        activeOpacity={0.8}
        onPress={onNearbyAreasPress}
      >
        <Text style={styles.buttonText}>Nearby Areas</Text>
        <Feather name="chevron-right" size={18} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: COLORS.textDark,
    fontSize: 18,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    color: COLORS.textDark,
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  updated: {
    color: COLORS.textLighter,
    fontSize: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLORS.gray100,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
});