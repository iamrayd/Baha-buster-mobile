import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export interface AlertItem {
  id: string;
  title: string;
  location: string;
  description: string;
  severity: 'critical' | 'moderate' | 'low';
  time: string;
  status: 'active' | 'acknowledged' | 'resolved';
  acknowledged: boolean;
}

interface AlertCardProps {
  alert: AlertItem;
  onAcknowledge?: (alertId: string) => void;
  onShare?: (alertId: string) => void;
  onPress?: (alert: AlertItem) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onAcknowledge,
  onShare,
  onPress,
}) => {
  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'critical': return COLORS.riskHigh;
      case 'moderate': return COLORS.riskMedium;
      case 'low': return COLORS.riskLow;
    }
  };

  const getSeverityBgColor = () => {
    switch (alert.severity) {
      case 'critical': return '#fee';
      case 'moderate': return '#fff5ee';
      case 'low': return '#f0fff4';
    }
  };

  const getAlertIcon = () => {
    switch (alert.severity) {
      case 'critical': return 'droplet';
      case 'moderate': return 'cloud-rain';
      default: return 'info';
    }
  };

  const severityColor = getSeverityColor();
  const bgColor = getSeverityBgColor();

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: severityColor }]}
      activeOpacity={0.9}
      onPress={() => onPress?.(alert)}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: severityColor + '20' }]}>
          <Feather name={getAlertIcon() as any} size={20} color={severityColor} />
        </View>
        
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: severityColor }]}>{alert.title}</Text>
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={12} color={COLORS.textLight} />
            <Text style={styles.location}>{alert.location}</Text>
          </View>
        </View>

        <View style={[styles.severityBadge, { backgroundColor: bgColor }]}>
          <Text style={[styles.severityText, { color: severityColor }]}>
            {alert.severity.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={3}>
        {alert.description}
      </Text>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.timeRow}>
          <Feather name="clock" size={12} color={COLORS.textLight} />
          <Text style={styles.time}>{alert.time}</Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{alert.status.toUpperCase()}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            alert.acknowledged && styles.actionButtonAcknowledged
          ]}
          onPress={() => onAcknowledge?.(alert.id)}
          activeOpacity={0.7}
        >
          <Feather 
            name={alert.acknowledged ? 'check' : 'check'} 
            size={16} 
            color={alert.acknowledged ? COLORS.riskLow : COLORS.textDark} 
          />
          <Text style={[
            styles.actionButtonText,
            alert.acknowledged && styles.actionButtonTextAcknowledged
          ]}>
            {alert.acknowledged ? 'Acknowledged' : 'Acknowledge'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => onShare?.(alert.id)}
          activeOpacity={0.7}
        >
          <Feather name="share-2" size={16} color={COLORS.textDark} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shareButton}
          activeOpacity={0.7}
        >
          <Feather name="alert-triangle" size={16} color={COLORS.riskMedium} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: COLORS.textMedium,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 11,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  statusBadge: {
    backgroundColor: '#e6fffa',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.riskLow,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  actionButtonAcknowledged: {
    backgroundColor: '#e6fffa',
    borderColor: COLORS.riskLow,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
    marginLeft: 6,
  },
  actionButtonTextAcknowledged: {
    color: COLORS.riskLow,
  },
  shareButton: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
});