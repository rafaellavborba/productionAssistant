import { Image, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/default/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/default/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

const headerMain = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        borderColor: 'white'
      },
})

export default function HeaderMain(){
  const colorScheme = useColorScheme();

    return (
        <ThemedView style={headerMain.stepContainer}>
            <Tabs  
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                    tabBarButton: HapticTab,
                    tabBarBackground: TabBarBackground,
                    tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                    }),
                }}
            >
                <Tabs.Screen 
                    name="settings"
                    options={{
                    title: 'Configurações',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                    }}
                />
            </Tabs>
        </ThemedView>
    )
}

