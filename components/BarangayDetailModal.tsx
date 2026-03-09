import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Animated, 
  PanResponder,
  Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { BarangayData } from '../constants/barangayData';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.8;
const COLLAPSED_HEIGHT = 170; 
const SNAP_TOP = 0;
const SNAP_BOTTOM = MODAL_HEIGHT - COLLAPSED_HEIGHT;

interface BarangayDetailModalProps {
  visible: boolean;
  barangay: BarangayData | null;
  onClose: () => void;
}

export const BarangayDetailModal: React.FC<BarangayDetailModalProps> = ({
  visible,
  barangay,
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const currentTranslateY = useRef(SCREEN_HEIGHT);

  useEffect(() => {
    const listenerId = translateY.addListener(({ value }) => {
      currentTranslateY.current = value;
    });

    return () => {
      translateY.removeListener(listenerId);
    };
  }, [translateY]);

  // Handle modal visibility changes
  useEffect(() => {
    if (visible) {
      setIsExpanded(false);
      translateY.setValue(SCREEN_HEIGHT); 
      Animated.spring(translateY, {
        toValue: SNAP_BOTTOM, 
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    }
  }, [visible, translateY]);

  const expandModal = () => {
    setIsExpanded(true);
    Animated.spring(translateY, {
      toValue: SNAP_TOP,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  };

  const collapseModal = () => {
    setIsExpanded(false);
    Animated.spring(translateY, {
      toValue: SNAP_BOTTOM,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsExpanded(false);
      onClose();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only take over if vertical movement is intentional (> 5px)
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        // Extract offset merges the current value into the offset so we start at 0 safely
        translateY.extractOffset();
      },
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        // Flatten offset merges the offset back into the value
        translateY.flattenOffset();
        
        // Use the safely tracked ref
        const currentY = currentTranslateY.current; 
        const velocityY = gestureState.vy;

        // Determine snap behavior based on velocity and position
        if (velocityY < -0.5 || currentY < SNAP_BOTTOM / 2) {
          expandModal();
        } else if (velocityY > 0.5 && currentY >= SNAP_BOTTOM) {
          closeModal();
        } else if (currentY >= SNAP_BOTTOM / 2) {
          collapseModal();
        }
      },
    })
  ).current;

  if (!barangay) return null;

  const getRiskColor = () => {
    switch (barangay.riskLevel?.toLowerCase()) {
      case 'high': return '#f97316'; 
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#22c55e'; 
    }
  };

  const getRiskLabel = () => {
    switch (barangay.riskLevel?.toLowerCase()) {
      case 'high': return 'HIGH';
      case 'medium': return 'MODERATE';
      case 'low': return 'LOW';
      default: return 'LOW';
    }
  };

  const getFloodDepth = () => {
    switch (barangay.riskLevel?.toLowerCase()) {
      case 'high': return '1.5 meters';
      case 'medium': return '0.8 meters';
      case 'low': return '0.2 meters';
      default: return '1.5 meters';
    }
  };

  const getChestDeep = () => {
    switch (barangay.riskLevel?.toLowerCase()) {
      case 'high': return '(Chest deep)';
      case 'medium': return '(Knee deep)';
      case 'low': return '(Ankle deep)';
      default: return '(Chest deep)';
    }
  };

  const riskColor = getRiskColor();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade" // Fade just for the overlay
      onRequestClose={closeModal}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={closeModal}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            {
              height: MODAL_HEIGHT,
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Stops taps inside the modal from closing the modal (bubbling to overlay) */}
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()} style={{ flex: 1 }}>
            
            {/* DRAGGABLE HEADER AREA - Controls the bottom sheet movement */}
            <View {...panResponder.panHandlers} style={styles.draggableArea}>
              <View style={styles.handleBar} />

              <View style={styles.header}>
                <Text style={styles.title}>Brgy. {barangay.name || 'Pari-an'}</Text>
              </View>

              <View style={styles.contentPadding}>
                {/* Flood Risk Card (Always Visible) */}
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: '#fff7ed' }]}>
                      <View style={[styles.alertIconCircle, { backgroundColor: riskColor }]}>
                        <Text style={styles.alertIconText}>!</Text>
                      </View>
                    </View>
                    <View style={styles.cardHeaderText}>
                      <Text style={styles.cardLabel}>Flood risk</Text>
                      <View style={styles.riskRow}>
                        <View style={styles.riskBadge}>
                          <Text style={[styles.riskText, { color: riskColor }]}>
                            {getRiskLabel()}
                          </Text>
                        </View>
                        <Text style={styles.timeText}>2 hours ago</Text>
                      </View>
                    </View>
                    <View style={[styles.statusDot, { backgroundColor: riskColor }]} />
                  </View>
                </View>
              </View>
            </View>

            {/* SCROLLABLE CONTENT AREA - Rendered securely underneath */}
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              scrollEnabled={isExpanded} // Prevent scrolling when collapsed to avoid conflicts
            >
              {/* Expected Flood Depth Card */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: '#fff7ed' }]}>
                    <View style={[styles.alertIconCircle, { backgroundColor: riskColor }]}>
                      <Text style={styles.alertIconText}>!</Text>
                    </View>
                  </View>
                  <View style={styles.cardHeaderText}>
                    <Text style={styles.cardLabel}>Expected Flood depth</Text>
                    <View style={styles.depthRow}>
                      <Text style={styles.depthText}>{getFloodDepth()}</Text>
                      <Text style={styles.chestText}>{getChestDeep()}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusDot, { backgroundColor: riskColor }]} />
                </View>
              </View>

              {/* 3-Day Forecast */}
              <Text style={styles.forecastTitle}>3-Day Flood Forecast</Text>
              
              <View style={styles.forecastContainer}>
                {/* Today */}
                <View style={styles.forecastCard}>
                  <Text style={styles.forecastDay}>Today</Text>
                  <Feather name="help-circle" size={32} color="#9ca3af" style={styles.forecastIcon} />
                  <View style={styles.forecastTemp}>
                    <Text style={styles.tempHigh}>32C</Text>
                    <Text style={styles.tempLow}>24C</Text>
                  </View>
                  <View style={styles.forecastRain}>
                    <Feather name="droplet" size={12} color={riskColor} />
                    <Text style={[styles.rainPercent, { color: riskColor }]}>30%</Text>
                  </View>
                </View>

                {/* Tomorrow */}
                <View style={styles.forecastCard}>
                  <Text style={styles.forecastDay}>Tomorrow</Text>
                  <Feather name="help-circle" size={32} color="#9ca3af" style={styles.forecastIcon} />
                  <View style={styles.forecastTemp}>
                    <Text style={styles.tempHigh}>32C</Text>
                    <Text style={styles.tempLow}>24C</Text>
                  </View>
                  <View style={styles.forecastRain}>
                    <Feather name="droplet" size={12} color={riskColor} />
                    <Text style={[styles.rainPercent, { color: riskColor }]}>30%</Text>
                  </View>
                </View>

                {/* Sunday */}
                <View style={styles.forecastCard}>
                  <Text style={styles.forecastDay}>Sunday</Text>
                  <Feather name="cloud" size={32} color="#6b7280" style={styles.forecastIcon} />
                  <View style={styles.forecastTemp}>
                    <Text style={styles.tempHigh}>31C</Text>
                    <Text style={styles.tempLow}>23C</Text>
                  </View>
                  <View style={styles.forecastRain}>
                    <Feather name="droplet" size={12} color="#f97316" />
                    <Text style={[styles.rainPercent, { color: '#f97316' }]}>45%</Text>
                  </View>
                </View>
              </View>
            </ScrollView>

          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  draggableArea: {
    backgroundColor: 'transparent',
    paddingTop: 12,
  },
  handleBar: {
    width: 48,
    height: 6,
    backgroundColor: '#d1d5db',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1f2937',
  },
  contentPadding: {
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  alertIconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertIconText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardHeaderText: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  riskBadge: {
    backgroundColor: '#fff7ed',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  riskText: {
    fontSize: 12,
    fontWeight: '700',
  },
  timeText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  depthRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  depthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  chestText: {
    fontSize: 13,
    color: '#9ca3af',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 12,
  },
  forecastTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginTop: 12,
    marginBottom: 12,
  },
  forecastContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  forecastCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  forecastDay: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 8,
  },
  forecastIcon: {
    marginVertical: 4,
  },
  forecastTemp: {
    alignItems: 'center',
    marginVertical: 8,
  },
  tempHigh: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  tempLow: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
  forecastRain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  rainPercent: {
    fontSize: 12,
    fontWeight: '600',
  },
});