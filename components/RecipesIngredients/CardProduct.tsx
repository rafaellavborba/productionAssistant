import { StyleSheet, Platform, useColorScheme, View, Animated } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/default/ThemedView';
import ThemedButton from '@/components/default/ThemedButton'
import {Image} from 'expo-image';
import { ThemedText } from '../default/ThemedText';
import {cardProduct} from './styles'
import CustomToggle from '../default/CustomToggle';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
export default function CardProduct(){
    const colorScheme = useColorScheme()
    const [isToggleOn, setIsToggleOn] = useState(false);

    const handleToggleChange = (newState:any) => {
      setIsToggleOn(newState); 
    };
    return (
        <ThemedView style={[cardProduct.stepContainer, {
            backgroundColor: colorScheme === 'light' ? '#FFF' : '#2B2B2B',
         }]}>
            <Image 
                source={require('@/assets/images/sabores_disponiveis/banana_borella_zero.jpg')}
                style={cardProduct.image}
                contentFit="cover"
                transition={1000}
                accessible
                accessibilityLabel='Foto da receita'
            />
            <View style={cardProduct.product}>
                <ThemedText lightColor='#606a55' darkColor='#FFF' style={cardProduct.productTitle}>Banana Borella</ThemedText>
                <View style={cardProduct.measuring}>
                    <ThemedText lightColor='#606a55' darkColor='#FFF' style={cardProduct.storageTitle}>Estoque: </ThemedText>
                    <View style={cardProduct.storageDefault}>
                        <View style={cardProduct.storageLow}></View>
                        <View style={cardProduct.storageMedium}></View>
                        <View style={cardProduct.storageHigh}></View>
                        <View style={cardProduct.storageFloat}>
                            <Icon name="arrow-upward" size={30} color={colorScheme === 'light' ? '#606a55' : '#FFF'} style={cardProduct.icon}/>

                            <ThemedText lightColor='#606a55' darkColor='#FFF' style={cardProduct.storageText}>1,00 KG</ThemedText>
                        </View>
                    
                    </View>
                </View>
                <View style={cardProduct.linked}>
                    <ThemedText lightColor='#606a55' darkColor='#FFF' style={cardProduct.text}>Receita vinculada</ThemedText>
                    <CustomToggle
                        isEnabledInitial={isToggleOn} 
                        onToggle={(newState:any) => handleToggleChange(newState)}
                        activeColor="#606a55"
                        inactiveColor="#865857"
                        size={40}
                    />          
                </View>
                <View style={cardProduct.activeProduct}>
                    <Icon name="check" size={40} color={colorScheme === 'light' ? '#606a55' : '#FFF'} style={cardProduct.icon}/>
                    <ThemedText lightColor='#606a55' darkColor='#FFF' style={cardProduct.text}>Produto Ativo</ThemedText>
                </View>
            </View>
            <View style={cardProduct.button}>
                <ThemedText style={cardProduct.notConected}>Não conectado</ThemedText>
                <ThemedButton
                    label="Produzir"
                    value=""
                    // onPress={}
                    style={{ backgroundColor: '#606a55' }}
                />
            </View>
           
        </ThemedView>
    )
}

