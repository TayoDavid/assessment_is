import { Modal, View, Text, Switch, StyleSheet, Pressable } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";

interface BiometricModalProps {
  isVisible: boolean;
  onClose: () => void;
  onToggleSwitch: () => void;
}

const BiometricModal = ({ isVisible, onToggleSwitch, onClose }: BiometricModalProps) => {
  const [enabled, setEnabled] = useState(false)

  const toggleSwitch = () => {
    setEnabled(!enabled)
    setTimeout(() => { onToggleSwitch() }, 1000)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <Pressable
          onPress={onClose}
          style={{ width: '100%', alignItems: 'flex-end' }}
        >
          <MaterialIcons name="close" size={20} color='red' />
        </Pressable>
        <MaterialIcons name="fingerprint" size={80} color='black' />
        <View style={styles.toggleContainer}>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Enable Biometric</Text>
          <Switch value={enabled} onChange={toggleSwitch} />
        </View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  modalContent: {
    height: '30%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#ebe8e8',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    elevation: 20,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 32,
    justifyContent: 'space-between',
    alignContent: 'space-between'
  }
})

export default BiometricModal