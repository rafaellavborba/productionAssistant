import React from 'react';
import ThemedButton from '@/components/default/ThemedButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigationState } from '@react-navigation/native';
import {TextInput} from 'react-native';
import { ThemedText } from '@/components/default/ThemedText';
import { ThemedView } from '@/components/default/ThemedView';
import { useColorScheme } from 'react-native';
import {Image} from 'expo-image'
import styles from '@/app/styles'
const ThemedLayout = ({layoutTitle, layoutIcon, layoutImageLabel, placeholder}: any) => {
    const colorScheme = useColorScheme()
    const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    const state = useNavigationState((state) => state);
    const currentTabIndex = state.index; 
    const [text, onChangeText] = React.useState('');
  
    return (
        <>
            <ThemedView style={styles.titleContainer}>
                <ThemedText lightColor='#C59D58' darkColor='#FFF' type="title" style={styles.titleText}>{layoutTitle}</ThemedText>
                <Image
                    source={layoutIcon}
                    contentFit="contain"
                    transition={1000}
                    placeholder={{ blurhash }}
                    style={styles.reactIcon}
                    accessible
                    accessibilityLabel={layoutImageLabel}
                />
            </ThemedView>
            <ThemedButton 
                label="Limpar Histórico"
                value=""
                // onPress={}
                style={[{ backgroundColor: 'transparent', textDecoration: 'underline', alignItems: 'left' }, colorScheme === 'light' ? {color: '#606a55'} : {color: '#FFF'}]}
                labelStyle={colorScheme === 'light' ? {color: '#606a55'} : {color: '#FFF'}}
            />
            <ThemedView style={styles.inputContainer}>
                <Icon name="search" size={40} color="#aaa" />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    value={text}
                    inlineImageLeft='@/assets/icons/search_icon'
                />
            </ThemedView>
        </>
    )
}

export default ThemedLayout