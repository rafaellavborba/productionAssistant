import { Platform, useColorScheme } from 'react-native';
import ParallaxScrollView from '@/components/default/ParallaxScrollView';
import ThemedLayout from '@/components/default/ThemedLayout';
import RecipesIngredients from '@/components/RecipesIngredients';
import { Image } from 'expo-image';
import styles from '../styles';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme()
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: ' #606a55', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/banners/banner_ingredients.jpg')}
          style={styles.reactBanner}
          contentFit="cover"
          transition={1000}
          accessible
          accessibilityLabel='Banner de Ingredientes'
        />
      }>
       <ThemedLayout 
          layoutTitle='Ingredientes'
          layoutIcon={
            colorScheme === 'light' 
              ? require('@/assets/icons/ingredientes-selected.svg') 
              : require('@/assets/icons/ingredientes.svg')
          }
          layoutImageLabel='Ícone de Ingredientes'
          placeholder='Pesquisar Ingredientes'
      />
      <RecipesIngredients />
    </ParallaxScrollView>
  );
}


