import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface EmergencyButtonsProps {
  onEmergencyPress?: () => void;
  onEvacuationPress?: () => void;
}

export const EmergencyButtons: React.FC<EmergencyButtonsProps> = ({
  onEmergencyPress,
  onEvacuationPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, styles.emergencyButton]} 
        activeOpacity={0.8}
        onPress={onEmergencyPress}
      >
        <Feather name="phone" size={24} color={COLORS.white} />
        <Text style={styles.buttonText}>Emergency{'\n'}Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.evacuationButton]} 
        activeOpacity={0.8}
        onPress={onEvacuationPress}
      >
        <Feather name="map-pin" size={24} color={COLORS.white} />
        <Text style={styles.buttonText}>Evacuation{'\n'}Routes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 16,
  },
  button: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  emergencyButton: {
    backgroundColor: '#2c5282', // Dark blue
  },
  evacuationButton: {
    backgroundColor: '#38a169', // Green
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
  },
});