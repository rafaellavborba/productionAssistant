import { Platform, useColorScheme } from 'react-native';
import ParallaxScrollView from '@/components/default/ParallaxScrollView';
import { ThemedText } from '@/components/default/ThemedText';
import { ThemedView } from '@/components/default/ThemedView';
import RecipesIngredients from '@/components/RecipesIngredients';
import { Image } from 'expo-image';
import { ScaledSheet } from 'react-native-size-matters';

const recipes = ScaledSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  titleText: {
    color: '#C59D58',
    fontSize: '24@s'

  },

  titleTextDark: {
    color: '#FFF',
    fontSize: '24@s'
  },

  reactBanner: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    height: 'auto',
    width: '100%',
    position: 'absolute'
  },

  reactIcon: {
    width: '28@s',
    height: '32@s',
    backgroundSize: 'contain',
    marginLeft: 12,
  }
});

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f0f0f0', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/banner.jpg')}
          style={recipes.reactBanner}
          contentFit="cover"
          transition={1000}
          accessible
          accessibilityLabel='Ícone de receitas'
        />
      }>
      <ThemedView style={recipes.titleContainer}>
        <ThemedText type="title" style={colorScheme === 'light' ? recipes.titleText : recipes.titleTextDark}>Receitas</ThemedText>
        <Image
          source={colorScheme === 'light' ? require('@/assets/icons/receitas-selected.svg') : require('@/assets/icons/receitas.svg')}
          contentFit="contain"
          transition={1000}
          placeholder={{ blurhash }}
          style={recipes.reactIcon}
          accessible
          accessibilityLabel='Ícone de receitas'
        />
      </ThemedView>
      <RecipesIngredients />
    </ParallaxScrollView>
  );
}


