import { Button, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { ArrowLeft as ArrowLeftIcon } from 'iconsax-react-native';

type NavHeaderProps = {
    title: string,
    subTitle?: string,
    onBack?: Function
};

function NavHeader({ title, subTitle, onBack }: NavHeaderProps) {
    return (
        <View>
            <View style={{ position: 'absolute', width: '100%', marginTop: (subTitle ? -4 : 2) }}>
                <Text style={{ textAlign: 'center' }}>{title}</Text>
                {(subTitle !== null) ? <Text style={{ textAlign: 'center', color: '#aaaaaa' }}>{subTitle}</Text> : <Text />}
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 16, width: 100 }}
                onPress={() => onBack?.()}
            >
                <ArrowLeftIcon color="#4080ff" size={24} />
                <Text style={{ color: '#4080ff', paddingLeft: 8, paddingRight: 8 }}>Wróć</Text>
            </TouchableOpacity>
        </View>
    );
}

export default NavHeader;