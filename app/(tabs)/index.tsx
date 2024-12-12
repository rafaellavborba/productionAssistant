import React from 'react';
import { useColorScheme } from 'react-native';
import ParallaxScrollView from '@/components/default/ParallaxScrollView';
import RecipesIngredients from '@/components/RecipesIngredients';
import { Image } from 'expo-image';
import styles from '../styles';
import { useNavigationState } from '@react-navigation/native';
import ThemedLayout from '@/components/default/ThemedLayout';

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  const [text, onChangeText] = React.useState('');
  const state = useNavigationState((state) => state);
  const currentTabIndex = state.index; 

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: ' #606a55', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/banners/banner.jpg')}
          style={styles.reactBanner}
          contentFit="cover"
          transition={1000}
          accessible
          accessibilityLabel='Ícone de receitas'
        />
      }>
      <ThemedLayout 
        layoutTitle='Receitas'
        layoutIcon={
          colorScheme === 'light' 
            ? require('@/assets/icons/receitas-selected.svg') 
            : require('@/assets/icons/receitas.svg')
        }
        layoutImageLabel='Ícone de Receitas'
        placeholder='Pesquisar Receitas'
      />
      <RecipesIngredients />
    </ParallaxScrollView>
  );
}


