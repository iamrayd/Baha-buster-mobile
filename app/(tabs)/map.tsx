import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { MenuDropdown } from '../../components/MenuDropdown';
import { BarangayDetailModal } from '../../components/BarangayDetailModal';
import { barangayPolygons, updateBarangayRisk, setRiskLevelsFromAPI, BarangayData } from '../../constants/barangayData';
import { COLORS } from '../../constants/colors';

/**
 * MapScreen - Interactive flood risk map with barangay heatmap
 */
export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayer, setSelectedLayer] = useState<'6hour' | '24hour' | 'historical' | null>('6hour');
  const [showLegend, setShowLegend] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedBarangay, setSelectedBarangay] = useState<BarangayData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Cebu City center
  const initialRegion = {
    latitude: 10.3157,
    longitude: 123.8854,
    latitudeDelta: 0.15,  
    longitudeDelta: 0.15,
  };

  const [barangays, setBarangays] = useState(barangayPolygons);

  // Example: Simulate risk level updates (for testing)
  // Uncomment to test dynamic updates
  useEffect(() => {
    // Simulate API update after 3 seconds
    const timer = setTimeout(() => {
      // Update risk levels
      updateBarangayRisk('Lahug', 'low');
      updateBarangayRisk('Banilad', 'high');
      updateBarangayRisk('Talamban', 'medium');
      
      // Trigger re-render with updated data
      setBarangays([...barangayPolygons]);
      
      console.log('Risk levels updated!');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    console.log('Search:', searchQuery);
  };

  const handleLayerToggle = (layer: '6hour' | '24hour' | 'historical') => {
    setSelectedLayer(selectedLayer === layer ? null : layer);
  };

  const handleRecenter = () => {
    mapRef.current?.animateToRegion(initialRegion, 1000);
  };

  const handleBarangayPress = (barangay: BarangayData) => {
    setSelectedBarangay(barangay);
    setModalVisible(true);
    console.log(`${barangay.name}: ${barangay.riskLevel.toUpperCase()} risk`);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBarangay(null);
  };

  const getPolygonColors = (riskLevel: 'none' | 'low' | 'medium' | 'high') => {
    switch (riskLevel) {
      case 'high':
        return {
          fillColor: 'rgba(239, 68, 68, 0.4)',   // Red with 40% opacity
          strokeColor: '#ef4444',
        };
      case 'medium':
        return {
          fillColor: 'rgba(249, 115, 22, 0.4)',  // Orange with 40% opacity
          strokeColor: '#f97316',
        };
      case 'low':
        return {
          fillColor: 'rgba(59, 130, 246, 0.4)',  // Blue with 40% opacity
          strokeColor: '#3b82f6',
        };
      case 'none':
      default:
        return {
          fillColor: 'rgba(156, 163, 175, 0.3)',  // Gray with 30% opacity
          strokeColor: '#9ca3af',
        };
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
          {/* Barangay Flood Risk Heatmap */}
          {barangays.map((barangay) => {
            const colors = getPolygonColors(barangay.riskLevel);
            return (
              <Polygon
                key={barangay.id}
                coordinates={barangay.coordinates}
                fillColor={colors.fillColor}
                strokeColor={colors.strokeColor}
                strokeWidth={2}
                tappable={true}
                onPress={() => handleBarangayPress(barangay)}
              />
            );
          })}
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
              <Text style={styles.legendTitle}>Flood Risk</Text>
              <TouchableOpacity onPress={() => setShowLegend(false)}>
                <Feather name="x" size={16} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
              <Text style={styles.legendText}>High Risk</Text>
            </View>
            
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#f97316' }]} />
              <Text style={styles.legendText}>Medium Risk</Text>
            </View>
            
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
              <Text style={styles.legendText}>Low Risk</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#9ca3af' }]} />
              <Text style={styles.legendText}>No Data</Text>
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

      {/* Barangay Detail Modal */}
      <BarangayDetailModal
        visible={modalVisible}
        barangay={selectedBarangay}
        onClose={handleCloseModal}
      />
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