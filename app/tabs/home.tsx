import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { RiskLevelCard } from '../../components/RiskLevelCard';
import { WeatherCard } from '../../components/WeatherCard';
import { AreaStatusCard } from '../../components/AreaStatusCard';
import { getGreeting } from '../../utils/helpers';
import { RiskLevelInfo, WeatherData, AreaStatus } from '../../constants/types';

/**
 * HomeScreen - Main dashboard of the app
 * Displays risk level, weather, and area status
 */
export default function HomeScreen() {
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

  return (
<SafeAreaView style={{ flex: 1, backgroundColor: '#f7fafc' }} edges={['top']}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View className="bg-primary-dark px-4 py-4 flex-row items-center justify-between">
        <TouchableOpacity activeOpacity={0.7}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        
        <View className="flex-1 ml-4">
          <Text className="text-white text-xl font-bold">Baha-Buster</Text>
          <Text className="text-white/70 text-xs">Active Alerts</Text>
        </View>
        
        <TouchableOpacity activeOpacity={0.7}>
          <Feather name="more-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Greeting Section */}
        <View className="px-4 pt-5 pb-3">
          <Text className="text-gray-800 text-2xl font-bold mb-2">{greeting}</Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Feather name="map-pin" size={16} color="#718096" />
              <Text className="text-gray-600 text-sm ml-2">Cebu City, Philippines</Text>
            </View>
            <TouchableOpacity 
              onPress={handleRefresh}
              className="bg-gray-100 rounded-full p-2"
              activeOpacity={0.7}
            >
              <Feather name="refresh-cw" size={16} color="#4a5568" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards Section */}
        <View className="px-4">
          <RiskLevelCard 
            riskInfo={riskInfo} 
            onPress={handleRiskCardPress}
          />
          
          <WeatherCard weather={weather} />
          
          <AreaStatusCard 
            areaStatus={areaStatus}
            onNearbyAreasPress={handleNearbyAreasPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}