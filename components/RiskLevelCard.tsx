import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RiskLevelInfo } from '../constants/types';
import { getRiskColor } from '../utils/helpers';

interface RiskLevelCardProps {
  riskInfo: RiskLevelInfo;
  onPress?: () => void;
}

export const RiskLevelCard: React.FC<RiskLevelCardProps> = ({ riskInfo, onPress }) => {
  const { level, message, lastUpdated } = riskInfo;
  
  return (
    <TouchableOpacity
      className={`${getRiskColor(level)} rounded-2xl p-5 mb-4 shadow-sm`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className="bg-white/30 rounded-full p-2 mr-3">
            <Feather name="check" size={20} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-white/80 text-xs mb-1">Current Risk Level</Text>
            <Text className="text-white text-2xl font-bold uppercase">{level}</Text>
          </View>
        </View>
        <Feather name="chevron-right" size={24} color="white" />
      </View>
      
      <Text className="text-white/90 text-sm leading-5 mb-2">
        {message}
      </Text>
      
      <Text className="text-white/60 text-xs">
        Last updated: {lastUpdated}
      </Text>
    </TouchableOpacity>
  );
};