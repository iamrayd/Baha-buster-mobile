import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { RiskLevelCard } from '../../components/RiskLevelCard';
import { WeatherCard } from '../../components/WeatherCard';
import { AreaStatusCard } from '../../components/AreaStatusCard';
import { EmergencyButtons } from '../../components/EmergencyButtons';
import { RecentAlertsCard, Alert } from '../../components/RecentAlertsCard';
import { MenuDropdown } from '../../components/MenuDropDown';
import { getGreeting } from '../../utils/helpers';
import { RiskLevelInfo, WeatherData, AreaStatus } from '../../constants/types';
import { COLORS } from '../../constants/colors';
import { ForecastDay, WeatherForecastCard } from '@/components/WeatherForecastCard';

/**
 * HomeScreen - Main dashboard of the app
 * Displays risk level, weather, and area status
 */
export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  
  // Mock data - will be replaced with API calls later
  const [riskInfo] = useState<RiskLevelInfo>({
    level: 'low',
    message: 'Your area is currently safe from flood risks. Continue monitoring weather conditions.',
    lastUpdated: '21:55'
  });

  const [weather] = useState<WeatherData>({
    condition: 'Partly Cloudy',
    temperature: 30,
    rainfall: 30,
    humidity: 75,
    windSpeed: 12
  });

  const [areaStatus] = useState<AreaStatus>({
    location: 'Banilad Cebu City, Philippines',
    riskLevel: 'high',
    lastUpdated: '5 minutes ago'
  });

  const [nearbyAreas] = useState([
    { name: 'Lahug', riskLevel: 'medium' as const },
    { name: 'IT Park', riskLevel: 'low' as const },
    { name: 'Ayala Center', riskLevel: 'high' as const },
  ]);

  const [recentAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'Flash Flood Warning-Lahug Area',
      severity: 'high',
      time: '2 hours ago',
    },
  ]);

  const [forecast] = useState<ForecastDay[]>([
    { day: 'Today', icon: 'cloud', temperature: 32, rainfall: 50 },
    { day: 'Tomorrow', icon: 'cloud-drizzle', temperature: 29, rainfall: 80 },
    { day: 'Sunday', icon: 'cloud-rain', temperature: 31, rainfall: 45 },
  ]);

  const greeting = getGreeting();

  const handleRefresh = () => {
    console.log('Refreshing data...');
    // TODO: Implement refresh logic
  };

  const handleRiskCardPress = () => {
    console.log('Risk card pressed');
    // TODO: Navigate to detailed risk info
  };

  const handleNearbyAreasPress = () => {
    console.log('Nearby areas pressed');
    // TODO: Navigate to nearby areas map
  };

  const handleEmergencyPress = () => {
    console.log('Emergency contacts pressed');
    // TODO: Open emergency contacts screen
  };

  const handleEvacuationPress = () => {
    console.log('Evacuation routes pressed');
    // TODO: Open evacuation routes screen
  };

  const handleAlertPress = (alert: Alert) => {
    console.log('Alert pressed:', alert);
    // TODO: Navigate to alert details
  };

  const handleViewMoreForecast = () => {
    console.log('View more forecast');
    // TODO: Navigate to detailed forecast
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Baha-Buster</Text>
          <Text style={styles.headerSubtitle}>Active Alerts</Text>
        </View>
        
        <TouchableOpacity 
          activeOpacity={0.7}
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

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <View style={styles.locationRow}>
            <View style={styles.locationInfo}>
              <Feather name="map-pin" size={16} color={COLORS.textLight} />
              <Text style={styles.locationText}>Cebu City, Philippines</Text>
            </View>
            <TouchableOpacity 
              onPress={handleRefresh}
              style={styles.refreshButton}
              activeOpacity={0.7}
            >
              <Feather name="refresh-cw" size={16} color={COLORS.textMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards Section */}
        <View style={styles.cardsSection}>
          <RiskLevelCard 
            riskInfo={riskInfo} 
            onPress={handleRiskCardPress}
          />
          
          <WeatherCard weather={weather} />
          
          <AreaStatusCard 
            areaStatus={areaStatus}
            nearbyAreas={nearbyAreas}
            showMoreCount={2}
            onNearbyAreasPress={handleNearbyAreasPress}
          />

          <EmergencyButtons 
            onEmergencyPress={handleEmergencyPress}
            onEvacuationPress={handleEvacuationPress}
          />

          <RecentAlertsCard 
            alerts={recentAlerts}
            onAlertPress={handleAlertPress}
          />
          
          <WeatherForecastCard 
            forecast={forecast}
            onViewMore={handleViewMoreForecast}
          />
        </View>


      </ScrollView>
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
    justifyContent: 'space-between',
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
  scrollView: {
    flex: 1,
  },
  greetingSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  greetingText: {
    color: COLORS.textDark,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    color: COLORS.textLight,
    fontSize: 14,
    marginLeft: 8,
  },
  refreshButton: {
    backgroundColor: COLORS.gray50,
    borderRadius: 20,
    padding: 8,
  },
  cardsSection: {
    paddingHorizontal: 16,
  },
});