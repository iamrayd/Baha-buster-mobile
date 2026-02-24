import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
  danger?: boolean;
}

interface MenuDropdownProps {
  visible: boolean;
  onClose: () => void;
  items: MenuItem[];
  anchorPosition?: { top: number; right: number };
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
  visible,
  onClose,
  items,
  anchorPosition = { top: 60, right: 16 },
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.menu, { top: anchorPosition.top, right: anchorPosition.right }]}>
              {items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    index === items.length - 1 && styles.menuItemLast,
                  ]}
                  onPress={() => {
                    item.onPress();
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <Feather 
                    name={item.icon as any} 
                    size={18} 
                    color={item.danger ? COLORS.riskHigh : COLORS.textDark} 
                  />
                  <Text 
                    style={[
                      styles.menuItemText,
                      item.danger && styles.menuItemTextDanger,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menu: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textDark,
    marginLeft: 12,
  },
  menuItemTextDanger: {
    color: COLORS.riskHigh,
  },
});