import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { MenuDropdown } from '../../components/MenuDropDown';
import { COLORS } from '../../constants/colors';

interface RiskMarker {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  riskLevel: 'low' | 'medium' | 'high';
}

/**
 * MapScreen - Interactive flood risk map
 */
export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayer, setSelectedLayer] = useState<'6hour' | '24hour' | 'historical' | null>('6hour');
  const [showLegend, setShowLegend] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  // Cebu City center
  const initialRegion = {
    latitude: 10.3157,
    longitude: 123.8854,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Sample markers
  const [markers] = useState<RiskMarker[]>([
    { id: '1', latitude: 10.3157, longitude: 123.8854, title: 'Cebu City Hall', riskLevel: 'medium' },
    { id: '2', latitude: 10.3269, longitude: 123.9065, title: 'Mandaue Risk Area', riskLevel: 'high' },
    { id: '3', latitude: 10.3103, longitude: 123.8931, title: 'IT Park', riskLevel: 'low' },
  ]);

  const handleSearch = () => {
    console.log('Search:', searchQuery);
  };

  const handleLayerToggle = (layer: '6hour' | '24hour' | 'historical') => {
    setSelectedLayer(selectedLayer === layer ? null : layer);
  };

  const handleRecenter = () => {
    mapRef.current?.animateToRegion(initialRegion, 1000);
  };

  const getMarkerColor = (riskLevel: 'low' | 'medium' | 'high') => {
    switch (riskLevel) {
      case 'high': return COLORS.riskHigh;
      case 'medium': return COLORS.riskMedium;
      case 'low': return COLORS.riskLow;
    }
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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Interactive Flood Map</Text>
          <Text style={styles.headerSubtitle}>Monitoring Active</Text>
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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color={COLORS.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search locations in Cebu..."
          placeholderTextColor={COLORS.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation
          showsMyLocationButton={false}
          showsCompass={false}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={`Risk: ${marker.riskLevel.toUpperCase()}`}
              pinColor={getMarkerColor(marker.riskLevel)}
            />
          ))}
        </MapView>

        {/* Layer Controls - Left */}
        <View style={styles.layerControls}>
          <TouchableOpacity 
            style={[styles.layerButton, selectedLayer === '6hour' && styles.layerButtonActive]}
            onPress={() => handleLayerToggle('6hour')}
            activeOpacity={0.8}
          >
            <Feather name="clock" size={18} color={selectedLayer === '6hour' ? COLORS.white : COLORS.textDark} />
            <Text style={[styles.layerText, selectedLayer === '6hour' && styles.layerTextActive]}>
              6-Hour Precipitation
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.layerButton, selectedLayer === '24hour' && styles.layerButtonActive]}
            onPress={() => handleLayerToggle('24hour')}
            activeOpacity={0.8}
          >
            <Feather name="calendar" size={18} color={selectedLayer === '24hour' ? COLORS.white : COLORS.textDark} />
            <Text style={[styles.layerText, selectedLayer === '24hour' && styles.layerTextActive]}>
              24-Hour Forecast
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.layerButton, selectedLayer === 'historical' && styles.layerButtonActive]}
            onPress={() => handleLayerToggle('historical')}
            activeOpacity={0.8}
          >
            <Feather name="database" size={18} color={selectedLayer === 'historical' ? COLORS.white : COLORS.textDark} />
            <Text style={[styles.layerText, selectedLayer === 'historical' && styles.layerTextActive]}>
              Historical Data
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.layerButton} activeOpacity={0.8}>
            <Feather name="layers" size={18} color={COLORS.textDark} />
            <Text style={styles.layerText}>Topographical View</Text>
          </TouchableOpacity>
        </View>

        {/* Legend - Right */}
        {showLegend && (
          <View style={styles.legend}>
            <View style={styles.legendHeader}>
              <Text style={styles.legendTitle}>Risk Levels</Text>
              <TouchableOpacity onPress={() => setShowLegend(false)}>
                <Feather name="x" size={16} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.riskHigh }]} />
              <Text style={styles.legendText}>High Risk</Text>
            </View>
            
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.riskMedium }]} />
              <Text style={styles.legendText}>Moderate Risk</Text>
            </View>
            
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.riskLow }]} />
              <Text style={styles.legendText}>Low Risk</Text>
            </View>
          </View>
        )}

        {/* Controls - Bottom Right */}
        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setShowLegend(!showLegend)}
            activeOpacity={0.8}
          >
            <Feather name="layers" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.controlButton}
            onPress={handleRecenter}
            activeOpacity={0.8}
          >
            <Feather name="crosshair" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
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
  searchContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textDark,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  layerControls: {
    position: 'absolute',
    left: 16,
    top: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 200,
  },
  layerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  layerButtonActive: {
    backgroundColor: COLORS.primary,
  },
  layerText: {
    color: COLORS.textDark,
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 10,
  },
  layerTextActive: {
    color: COLORS.white,
  },
  legend: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 140,
  },
  legendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendTitle: {
    color: COLORS.textDark,
    fontSize: 14,
    fontWeight: '600',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: COLORS.textDark,
    fontSize: 12,
  },
  controls: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    gap: 12,
  },
  controlButton: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
});