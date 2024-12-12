import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { HapticTab } from '@/components/default/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { backgroundMain, Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/default/ThemedView';
import { ScaledSheet } from 'react-native-size-matters';
const styles = ScaledSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,

  },
  topBarButton: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  topBarText: {
    fontSize: '14@s',
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 14
  },
  image: {
    width: '28@s',
    height: '32@s',
    backgroundSize: 'contain',
    
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column', 
    padding: 5, 
    borderRadius: 10,
  },
  tabIconLabel: {
    fontSize: 12,
    marginTop: 5, 
  },
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colorBackground = [
    styles.topBar,
    colorScheme === 'light' && { backgroundColor: backgroundMain },
  ];
  
  
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <>
      <ThemedView style={colorBackground}>
        <TouchableOpacity style={styles.topBarButton}>
          <Image
            style={styles.image}
            alt='Outros Apps'
            source={require("@/assets/icons/outros-app.png")}
            placeholder={{ blurhash }}
            contentFit="contain"
            transition={1000}
            accessible
            accessibilityLabel='Outros APPS'
            allowDownscaling
          />
          <Text style={styles.topBarText}>Receitas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topBarButton}>
        <Image
            style={styles.image}
            alt='Configurações'
            source={require("@/assets/icons/setting.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
            accessible
            accessibilityLabel='Outros APPS'
            allowDownscaling
          />
        </TouchableOpacity>
      </ThemedView>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarLabelPosition: 'below-icon',
          tabBarStyle: Platform.select({
            default: {
              backgroundColor: colorScheme === 'light' ? backgroundMain : Colors[colorScheme ?? 'dark'].background,
              paddingTop: 20,
              height:  80
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Receitas',
            tabBarIcon: ({ color }) => <IconSymbol size={50} name="house.fill" color={color} style={{marginBottom: 20, height: 50}}/>,
          }}
        />

        <Tabs.Screen
          name="ingredients"
          options={{
            title: 'Ingredientes',
            tabBarIcon: ({ color }) => <IconSymbol size={50} name="house.fill" color={color} style={{marginBottom: 20, height: 50}}/>,
          }}
        />
        <Tabs.Screen
          name="return"
          options={{
            title: 'Retornos',
            tabBarIcon: ({ color }) => <IconSymbol size={50} name="house.fill" color={color} style={{marginBottom: 20, height: 50}}/>,
          }}
        />
        <Tabs.Screen
          name="logs"
          options={{
            title: 'Histórico',
            tabBarIcon: ({ color }) => <IconSymbol size={50} name="house.fill" color={color} style={{marginBottom: 20, height: 50}}/>,
          }}
        />
      </Tabs>
    </>
  );
}

