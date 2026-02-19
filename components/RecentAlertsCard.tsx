import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export interface Alert {
  id: string;
  title: string;
  severity: 'low' | 'moderate' | 'high';
  time: string;
}

interface RecentAlertsCardProps {
  alerts: Alert[];
  onAlertPress?: (alert: Alert) => void;
  maxDisplay?: number;
}

export const RecentAlertsCard: React.FC<RecentAlertsCardProps> = ({ 
  alerts,
  onAlertPress,
  maxDisplay = 1,
}) => {
  const displayAlerts = alerts.slice(0, maxDisplay);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return COLORS.riskLow;
      case 'moderate': return COLORS.riskMedium;
      case 'high': return COLORS.riskHigh;
      default: return COLORS.textLight;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return 'alert-circle';
      case 'moderate': return 'alert-triangle';
      default: return 'info';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Feather name="bell" size={18} color={COLORS.primary} />
        <Text style={styles.title}>Recent Alerts</Text>
      </View>

      {displayAlerts.length === 0 ? (
        <Text style={styles.noAlerts}>No active alerts</Text>
      ) : (
        displayAlerts.map((alert) => (
          <TouchableOpacity
            key={alert.id}
            style={styles.alertItem}
            activeOpacity={0.7}
            onPress={() => onAlertPress?.(alert)}
          >
            <View 
              style={[
                styles.iconContainer, 
                { backgroundColor: `${getSeverityColor(alert.severity)}15` }
              ]}
            >
              <Feather 
                name={getSeverityIcon(alert.severity) as any} 
                size={16} 
                color={getSeverityColor(alert.severity)} 
              />
            </View>
            
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle} numberOfLines={1}>
                {alert.title}
              </Text>
              <View style={styles.alertMeta}>
                <Text 
                  style={[
                    styles.severityBadge, 
                    { color: getSeverityColor(alert.severity) }
                  ]}
                >
                  {alert.severity.toUpperCase()}
                </Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
            </View>

            <Feather name="chevron-right" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        ))
      )}
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
    marginBottom: 16,
  },
  title: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef9f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    color: COLORS.textDark,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  alertMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityBadge: {
    fontSize: 11,
    fontWeight: '600',
    marginRight: 8,
  },
  alertTime: {
    color: COLORS.textLight,
    fontSize: 11,
  },
  noAlerts: {
    color: COLORS.textLight,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 12,
  },
});