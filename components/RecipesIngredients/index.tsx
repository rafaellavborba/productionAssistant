import { Image, StyleSheet, Platform } from 'react-native';
import { ThemedView } from '@/components/default/ThemedView';
import { useIsFocused } from '@react-navigation/native';
import CardProduct from './CardProduct';

const recipesIngredients = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 8,
      },
})

export default function RecipesIngredients(){
    const isFocused = useIsFocused();
    return (
        <ThemedView style={recipesIngredients.stepContainer}>
            <CardProduct />
        </ThemedView>
    )
}

