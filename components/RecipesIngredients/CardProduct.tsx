import { Image, StyleSheet, Platform } from 'react-native';
import { ThemedView } from '@/components/default/ThemedView';
import { useIsFocused } from '@react-navigation/native';

const cardProduct = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        borderColor: 'white'
      },
})

export default function CardProduct(){
    const isFocused = useIsFocused();
    return (
        <ThemedView style={cardProduct.stepContainer}>
            
        </ThemedView>
    )
}

