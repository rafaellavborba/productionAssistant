import { Platform, useColorScheme } from 'react-native';
import ParallaxScrollView from '@/components/default/ParallaxScrollView';
import { ThemedText } from '@/components/default/ThemedText';
import { ThemedView } from '@/components/default/ThemedView';
import { Image } from 'expo-image';
import styles from '../styles';

export default function Retornos() {
  const colorScheme = useColorScheme()
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: ' #606a55', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/banners/banner_return.jpg')}
          style={styles.reactBanner}
          contentFit="cover"
          transition={1000}
          accessible
          accessibilityLabel='Banner de Ingredientes'
        />
      }>
      <ThemedView style={styles.titleContainer}>
          <ThemedText lightColor='#C59D58' darkColor='#FFF' type="title" style={styles.titleText}>Retornos</ThemedText>
          <Image
            source={colorScheme === 'light' 
              ? require('@/assets/icons/retornos-selected.svg') 
              : require('@/assets/icons/retornos_branco.svg')
            }
            contentFit="contain"
            transition={1000}
            placeholder={{ blurhash }}
            style={styles.reactIcon}
            accessible
            accessibilityLabel='Ícone de ingredientes'
          />
      </ThemedView>
    </ParallaxScrollView>
  );
}


