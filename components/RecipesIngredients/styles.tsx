import { ScaledSheet } from 'react-native-size-matters';

export const cardProduct = ScaledSheet.create({
    stepContainer: {
        cursor: 'pointer',
        position: 'relative',
        gap: 8,
        marginBottom: 24,
        borderColor: 'white',
        width: '100%',
        height: 'auto',
        minHeight: 650,
        borderRadius: 30,
        textAlign: 'center'
    },
    image: {
        height: '285@s',
        width: '100%',
        borderRadius: 30
    },
    notConected: {
        marginBottom: 14,
        color: 'red',
        textAlign: 'left',
        position: 'absolute',
        top: -30,
        left: 20,
        width: '100%',
        fontSize: '12@s'
    },
    product: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 20
    },
    productTitle: {
        fontSize: '12@s',
        fontWeight: 'bold',
        marginBottom: '12@s'
    },
    measuring: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom: 130,
    },
    storageDefault: {
        width: '100%',
        height: 8,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        marginTop: 8,
    },
    storageLow: {
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: '#865857',
        height: '100%',
        width: '33%',
    },
    storageMedium: {
        backgroundColor: '#C59D58',
        height: '100%',
        width: '33%',
    },
    storageHigh: {
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#606a55',
        height: '100%',
        width: '33%'
    },
    storageTitle: {
        fontSize: '12@s',
        whiteSpace: 'nowrap',
        textAlign: 'left',
        marginBottom: '10@s'
    },
    storageText: {
        fontSize: '10@s',
        whiteSpace: 'nowrap',
        textAlign: 'left',
        marginTop: '8@s'
    },
    storageFloat: {
        bottom: -100,
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    linked: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: '10@s',
        whiteSpace: 'nowrap',
        textAlign: 'left',
        marginRight: '12@s'
    },
    toggle: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    activeProduct: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10@s'
    },
   icon: {
        marginRight: '12@s'
    },
    button: {
        marginVertical: '10@s',
        padding: 14
    },
    
})
