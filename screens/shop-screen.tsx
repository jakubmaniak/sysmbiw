import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import TwemojiText from 'react-native-twemojis';
import { ShoppingCart as ShoppingCartIcon, DollarCircle as DollarCircleIcon } from 'iconsax-react-native';

import plural from '../helpers/plural';
import useStorage from '../hooks/use-storage';


function ShopScreen({ navigation }: BottomTabScreenProps<ParamListBase, 'Shop'>) {
    const styles = StyleSheet.create({
        itemList: { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 16 },
        title: { paddingTop: 24, paddingBottom: 12, color: '#3a3a3a', fontSize: 14, fontWeight: 'bold' },
        shopItem: { display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 4, marginTop: 8, paddingLeft: 18, paddingTop: 24, paddingBottom: 24, maxWidth: 300, width: '100%' },
        icon: { fontSize: 36, height: 42, width: 42, textAlign: 'center' }
    });

    const { money, setMoney, achievements, setAchievements } = useStorage();

    const items = [
        { id: 'parrot', name: 'Papuga', cost: 5, icon: '🦜' },
        { id: 'mammoth', name: 'Mamut', cost: 5, icon: '🦣' },
        { id: 'giraffe', name: 'Żyrafa', cost: 10, icon: '🦒' },
        { id: 'snake', name: 'Wąż', cost: 15, icon: '🐍' },
        { id: 'squirrel', name: 'Wiewiórka', cost: 15, icon: '🐿' }
    ];

    function onBuy(item: any) {
        if (money - item.cost >= 0) {
            setMoney(money - item.cost);
            setAchievements([...achievements, item.id]);
        }
    }

    // useEffect(() => {
    //     setAchievements([]);
    //     setMoney(1000);
    // }, []);

    const availableItems = items.filter((item) => !achievements.includes(item.id));

    return (
        <ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 24 }}>
                <DollarCircleIcon color="#4080ff" size={24} />
                <Text style={{ marginLeft: 8 }}>{money}</Text>
            </View>
            <View style={styles.itemList}>
                {(availableItems.length === 0) ? <Text>Brak przedmiotów do kupienia</Text> : (
                    <>
                        <Text style={styles.title}>Postacie</Text>
                        {availableItems.map((item) => (
                            <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.shopItem} onPress={() => onBuy(item)}>
                                <TwemojiText style={styles.icon}>{item.icon}</TwemojiText>
                                <View style={{ paddingLeft: 12, flex: 1 }}>
                                    <Text style={{ color: '#3a3a3a' }}>{item.name}</Text>
                                    <Text style={{ color: '#aaaaaa' }}>{item.cost} {plural(item.cost, 'moneta', 'monety', 'monet')}</Text>
                                </View>
                                <ShoppingCartIcon color="#4080ff" size={24} style={{ marginRight: 24 }} />
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            </View>
        </ScrollView>
    );
}


export default ShopScreen;