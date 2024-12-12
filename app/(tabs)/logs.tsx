import React from 'react';
import ParallaxScrollView from '@/components/default/ParallaxScrollView';
import ThemedLayout from '@/components/default/ThemedLayout';
import { Image } from 'expo-image';
import styles from '../styles';
import { useColorScheme } from 'react-native';


export default function Logs() {
  const colorScheme = useColorScheme()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: ' #606a55', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/banners/banner_logs.jpg')}
          style={styles.reactBanner}
          contentFit="cover"
          transition={1000}
          accessible
          accessibilityLabel='Banner de Ingredientes'
        />
      }>
     <ThemedLayout 
        layoutTitle='Histórico de Produção'
        layoutIcon={
          colorScheme === 'light' 
            ? require('@/assets/icons/ingredientes-selected.svg')
            : require('@/assets/icons/ingredientes.svg')
        }
        layoutImageLabel='Ícone de Histórico'
        placeholder='Pesquisar Receita'
      />
    </ParallaxScrollView>
  );
}


