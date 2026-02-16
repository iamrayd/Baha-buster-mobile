import React from 'react';
import { View, Text } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { WeatherData } from '../constants/types';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const { condition, temperature, rainfall, humidity, windSpeed } = weather;
  
  return (
    <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Feather name="info" size={20} color="#718096" className="mr-2" />
          <View className="ml-2">
            <Text className="text-gray-700 font-semibold text-base">Today's Weather</Text>
            <Text className="text-gray-500 text-sm">{condition}</Text>
          </View>
        </View>
        <Text className="text-gray-800 text-3xl font-bold">{temperature}°C</Text>
      </View>
      
      {/* Weather Metrics */}
      <View className="flex-row justify-between pt-4 border-t border-gray-100">
        {/* Rainfall */}
        <View className="items-center flex-1">
          <View className="bg-red-50 rounded-full p-2 mb-2">
            <Ionicons name="water" size={18} color="#e53e3e" />
          </View>
          <Text className="text-gray-800 font-semibold text-base">{rainfall}%</Text>
          <Text className="text-gray-500 text-xs">Rainfall</Text>
        </View>
        
        {/* Humidity */}
        <View className="items-center flex-1">
          <View className="bg-green-50 rounded-full p-2 mb-2">
            <Ionicons name="water-outline" size={18} color="#48bb78" />
          </View>
          <Text className="text-gray-800 font-semibold text-base">{humidity}%</Text>
          <Text className="text-gray-500 text-xs">Humidity</Text>
        </View>
        
        {/* Wind */}
        <View className="items-center flex-1">
          <View className="bg-blue-50 rounded-full p-2 mb-2">
            <Feather name="wind" size={18} color="#4299e1" />
          </View>
          <Text className="text-gray-800 font-semibold text-base">{windSpeed} km/h</Text>
          <Text className="text-gray-500 text-xs">Wind</Text>
        </View>
      </View>
    </View>
  );
};