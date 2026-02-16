import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-gray-800 text-2xl font-bold mb-2">Map View</Text>
        <Text className="text-gray-600 text-center">
          Interactive flood risk map will be displayed here
        </Text>
      </View>
    </SafeAreaView>
  );
}