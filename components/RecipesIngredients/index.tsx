import React from 'react';
import { ThemedView } from '@/components/default/ThemedView';
import CardProduct from './CardProduct';
import { ScaledSheet } from 'react-native-size-matters';


const recipesIngredients = ScaledSheet.create({
    
    stepContainer: {
        gap: 8,
    },
   
})

export default function RecipesIngredients(){

 
    return (
            <ThemedView style={recipesIngredients.stepContainer}>
                <CardProduct />
                <CardProduct />
            </ThemedView>
    )
}

