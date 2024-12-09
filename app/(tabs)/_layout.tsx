import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { HapticTab } from '@/components/default/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/default/ThemedView';
import { ScaledSheet } from 'react-native-size-matters';
const styles = ScaledSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  topBarButton: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  topBarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 14
  },
  image: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    height: '30@s',
    width: '30@s',
    backgroundSize: 'cover'
  }
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <>
      <ThemedView style={styles.topBar}>
        <TouchableOpacity style={styles.topBarButton}>
          <Image
            style={styles.image}
            alt='Outros Apps'
            source="@/assets/icons/outros-app.png"
            placeholder={{ blurhash }}
            contentFit="cover"
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
            source="@/assets/icons/setting.png"
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
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute', // Flutua sobre a tela
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Receitas',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="ingredients"
          options={{
            title: 'Ingredientes',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

