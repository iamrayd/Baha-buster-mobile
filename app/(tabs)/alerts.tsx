import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '../../constants/colors';
import { AlertCard, AlertItem } from '../../components/AlertCard';
import { MenuDropdown } from '../../components/MenuDropdown';


export default function AlertsScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: '1',
      title: 'Critical Flood Warning',
      location: 'Downtown Cebu City',
      description: 'Severe flooding expected in downtown Cebu City. Water levels rising rapidly due to continuous heavy rainfall. Immediate evacuation recommended for low-lying areas.',
      severity: 'critical',
      time: '15m ago',
      status: 'active',
      acknowledged: false,
    },
    {
      id: '2',
      title: 'Moderate Weather Alert',
      location: 'Mandaue City',
      description: 'Continuous rainfall with potential for localized flooding in Mandaue City. Monitor water levels and avoid low-lying roads.',
      severity: 'moderate',
      time: '1h ago',
      status: 'active',
      acknowledged: false,
    },
  ]);

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId
          ? { ...alert, acknowledged: !alert.acknowledged }
          : alert
      )
    );
  };

  const handleShare = (alertId: string) => {
    console.log('Share alert:', alertId);
    // TODO: Implement share functionality
  };

  const handleAlertPress = (alert: AlertItem) => {
    console.log('Alert pressed:', alert);
    // TODO: Navigate to alert details
  };

  const handleReadAll = () => {
    setAlerts(prev =>
      prev.map(alert => ({ ...alert, acknowledged: true }))
    );
  };

  const handleLogout = () => {
    console.log('Logging out...');
    router.replace('/login');
  };

  const menuItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'user',
      onPress: () => console.log('Profile pressed'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      onPress: () => console.log('Settings pressed'),
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: 'log-out',
      onPress: handleLogout,
      danger: true,
    },
  ];

  const activeAlertsCount = alerts.filter(a => a.status === 'active').length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Alert Management</Text>
          <Text style={styles.headerSubtitle}>
            {activeAlertsCount} Active Alert{activeAlertsCount !== 1 ? 's' : ''}
          </Text>
        </View>

        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => console.log('Settings pressed')}
        >
          <Feather name="settings" size={24} color={COLORS.white} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Feather name="more-vertical" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Menu Dropdown */}
      <MenuDropdown
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        items={menuItems}
      />

      {/* Alert List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onAcknowledge={handleAcknowledge}
            onShare={handleShare}
            onPress={handleAlertPress}
          />
        ))}

        {alerts.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="bell-off" size={64} color={COLORS.textLighter} />
            <Text style={styles.emptyTitle}>No Active Alerts</Text>
            <Text style={styles.emptyDescription}>
              You'll be notified when flood risks are detected in your area
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Read All Button */}
      {alerts.some(a => !a.acknowledged) && (
        <View style={styles.bottomAction}>
          <TouchableOpacity
            style={styles.readAllButton}
            onPress={handleReadAll}
            activeOpacity={0.8}
          >
            <Feather name="check-circle" size={20} color={COLORS.white} />
            <Text style={styles.readAllText}>Read All</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

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
  },
  headerContent: {
    flex: 1,
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
  menuButton: {
    marginLeft: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    color: COLORS.textDark,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    color: COLORS.textLight,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  readAllButton: {
    backgroundColor: COLORS.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  readAllText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});