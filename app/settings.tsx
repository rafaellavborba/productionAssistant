import { Image, StyleSheet, Platform } from 'react-native';
import { ThemedView } from '@/components/default/ThemedView';
import { useIsFocused } from '@react-navigation/native';

const settingsMain = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        borderColor: 'white'
      },
})

export default function SettingsMain(){
    const isFocused = useIsFocused();
    return (
        <ThemedView style={settingsMain.stepContainer}>
            
        </ThemedView>
    )
}

