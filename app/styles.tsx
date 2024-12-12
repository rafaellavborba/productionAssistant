import { ScaledSheet } from 'react-native-size-matters';


const styles = ScaledSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '100%',
        overflowX: 'hidden'
    },  
    titleText: {
        fontSize: '14@s'
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
    },
    super: {
        marginBottom: 24,
        width: '100%',
        flexWrap: 'wrap',
    },
    input: {
        backgroundColor: '#d7d2c4',
        borderRadius: '30@s',
        height: 60,
        width: '100%',
        fontSize: '8@s',
        paddingHorizontal: '14@s',
        color: 'rgb(91 91 91);',
    },
    inputContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        minHeight: 60,
        width: '100%',
        marginVertical: '14@s',
    },
    icon: {
        position: 'absolute',
        right: 55,
        top: 10,
        zIndex: 2,
    }
});

export default styles