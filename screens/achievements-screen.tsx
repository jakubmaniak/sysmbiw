import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import TwemojiText from 'react-native-twemojis';

import useStorage from '../hooks/use-storage';


function AchievementsScreen({ navigation }: BottomTabScreenProps<ParamListBase, 'Achievements'>) {
    const styles = StyleSheet.create({
        itemList: { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 16 },
        title: { paddingTop: 24, paddingBottom: 12, color: '#3a3a3a', fontSize: 14, fontWeight: 'bold' },
        shopItem: { display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 4, marginTop: 8, paddingLeft: 18, paddingTop: 24, paddingBottom: 24, maxWidth: 300, width: '100%' },
        icon: { fontSize: 36, height: 42, width: 42, textAlign: 'center' }
    });

    const { achievements, setAchievements } = useStorage();

    const items = [
        { id: 'parrot', name: 'Papuga', cost: 5, icon: '🦜' },
        { id: 'mammoth', name: 'Mamut', cost: 5, icon: '🦣' },
        { id: 'giraffe', name: 'Żyrafa', cost: 10, icon: '🦒' },
        { id: 'snake', name: 'Wąż', cost: 15, icon: '🐍' },
        { id: 'squirrel', name: 'Wiewiórka', cost: 15, icon: '🐿' }
    ];


    const availableItems = items.filter((item) => achievements.includes(item.id));

    return (
        <ScrollView>
            <View style={styles.itemList}>
                {(availableItems.length === 0) ? <Text>Brak przedmiotów</Text> : (
                    <>
                        <Text style={styles.title}>Postacie</Text>
                        {availableItems.map((item) => (
                            <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.shopItem}>
                                <TwemojiText style={styles.icon}>{item.icon}</TwemojiText>
                                <View style={{ paddingLeft: 12, flex: 1 }}>
                                    <Text style={{ color: '#3a3a3a' }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            </View>
        </ScrollView>
    );
}


export default AchievementsScreen;