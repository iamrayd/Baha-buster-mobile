import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AlertsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-gray-800 text-2xl font-bold mb-2">Active Alerts</Text>
        <Text className="text-gray-600 text-center">
          Flood alerts and warnings will be displayed here
        </Text>
      </View>
    </SafeAreaView>
  );
}