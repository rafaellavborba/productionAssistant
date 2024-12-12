
import { ThemedView } from '@/components/default/ThemedView';
import { ScaledSheet } from 'react-native-size-matters';
import { Avatar } from '@rneui/themed';
import { ThemedText } from '../default/ThemedText';
import { useNavigationState } from '@react-navigation/native';
const countProducts = ScaledSheet.create({
    stepContainer: {
        gap: 8,
        borderColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#d7d2c4',
        borderRadius: '50@s',
        height: 55,
        width: 'auto',
        minWidth: 100,
        maxWidth: 300,
        paddingRight: 18,
        marginBottom: 8,
        marginLeft: 24
    },
    textStyles: {
        fontSize: '8@s',
        textAlign: 'right',
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 'auto',
        color: 'rgb(91 91 91);',
        marginLeft: '30@s'
    },
    avatarStyle: {
        backgroundColor: '#606a55', 
        position: 'absolute',
        left: -30,
        top: -10,
        bottom: -10,
        zIndex: 2,
        height: 'auto',
        minWidth: '35@s',
        borderRadius: '30@s',
        paddingVertical: '8@s',
    },
    avatarTitle: {
        fontSize: '10@s',
        fontWeight: 'bold',
    }
})
interface CountProductsProps {
    count: Number;
}
const CountProducts: React.FC<CountProductsProps> = ({count}) =>{
    const state = useNavigationState((state) => state);
    const currentTabIndex = state.index; 
    return (
        <ThemedView style={countProducts.stepContainer}>
            <Avatar
                size="large"
                title={count.toString()}
                titleStyle={countProducts.avatarTitle}
                rounded
                containerStyle={countProducts.avatarStyle}
            />
            <ThemedText type='defaultSemiBold' style={countProducts.textStyles}>
                {currentTabIndex === 0 ? 'Receitas' : 'Ingredientes'}
            </ThemedText>
        </ThemedView>
    )
}

export default CountProducts