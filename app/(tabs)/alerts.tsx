import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { Alert, RecentAlertsCard } from '../../components/RecentAlertsCard';

/**
 * AlertsScreen - Full alerts list and weather forecast
 */
export default function AlertsScreen() {
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'Flash Flood Warning-Lahug Area',
      severity: 'high',
      time: '2 hours ago',
    },
    {
      id: '2',
      title: 'Heavy Rainfall Advisory',
      severity: 'moderate',
      time: '4 hours ago',
    },
    {
      id: '3',
      title: 'Flood Risk Update -IT Park',
      severity: 'low',
      time: '1 day ago',
    },
  ]);

  const handleAlertPress = (alert: Alert) => {
    console.log('Alert pressed:', alert);
    // TODO: Navigate to alert details
  };



  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7}>
          <Feather name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Baha-Buster</Text>
          <Text style={styles.headerSubtitle}>Active Alerts</Text>
        </View>
        
        <TouchableOpacity activeOpacity={0.7}>
          <Feather name="more-vertical" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="bell" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
          </View>

          {alerts.map((alert) => (
            <TouchableOpacity
              key={alert.id}
              style={styles.alertItem}
              activeOpacity={0.7}
              onPress={() => handleAlertPress(alert)}
            >
              <View 
                style={[
                  styles.iconContainer, 
                  { backgroundColor: getSeverityColor(alert.severity) + '15' }
                ]}
              >
                <Feather 
                  name={getSeverityIcon(alert.severity)} 
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

              <Feather name="circle" size={8} color={getSeverityColor(alert.severity)} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low': return COLORS.riskLow;
    case 'moderate': return COLORS.riskMedium;
    case 'high': return COLORS.riskHigh;
    default: return COLORS.textLight;
  }
};

const getSeverityIcon = (severity: string): any => {
  switch (severity) {
    case 'high': return 'alert-circle';
    case 'moderate': return 'alert-triangle';
    default: return 'info';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.textDark,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
});