import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AreaStatus } from '../constants/types';
import { getRiskTextColor } from '../utils/helpers';

interface AreaStatusCardProps {
  areaStatus: AreaStatus;
  onNearbyAreasPress?: () => void;
}

export const AreaStatusCard: React.FC<AreaStatusCardProps> = ({ 
  areaStatus, 
  onNearbyAreasPress 
}) => {
  const { location, riskLevel, lastUpdated } = areaStatus;
  
  // Get badge color based on risk level
  const getBadgeColor = () => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-100';
      case 'medium':
        return 'bg-orange-100';
      case 'high':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };
  
  return (
    <View className="bg-white rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-row items-start flex-1">
          <View className="bg-blue-50 rounded-full p-2 mr-3 mt-1">
            <Feather name="map-pin" size={18} color="#4299e1" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-700 font-semibold text-base mb-1">
              Your Area Status
            </Text>
            <Text className="text-gray-600 text-sm leading-5">
              {location}
            </Text>
          </View>
        </View>
        
        {/* Risk Badge */}
        <View className={`${getBadgeColor()} px-3 py-1 rounded-full ml-2`}>
          <Text className={`${getRiskTextColor(riskLevel)} font-semibold text-xs uppercase`}>
            {riskLevel}
          </Text>
        </View>
      </View>
      
      {/* Last Updated */}
      <Text className="text-gray-400 text-xs mb-3">
        Last updated: {lastUpdated}
      </Text>
      
      {/* Nearby Areas Link */}
      <TouchableOpacity 
        onPress={onNearbyAreasPress}
        className="border-t border-gray-100 pt-3"
        activeOpacity={0.7}
      >
        <Text className="text-blue-600 text-sm font-medium">
          Nearby Areas
        </Text>
      </TouchableOpacity>
    </View>
  );
};