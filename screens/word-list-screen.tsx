import { useContext, useEffect, useRef } from 'react';
import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import plural from '../helpers/plural';
import useRerender from '../hooks/use-rerender';
import WordsContext, { WordSet } from '../contexts/words';
import NavHeader from '../components/nav-header';


function WordListScreen({ navigation }: BottomTabScreenProps<ParamListBase, 'WordList'>) {
    const styles = StyleSheet.create({
        mainContainer: { display: 'flex', flexDirection: 'column', alignContent: 'center' },
        set: { padding: 24, paddingTop: 12, paddingLeft: 20 },
        setName: { fontWeight: '600', textAlign: 'center' },
        itemList: { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 16 },
        title: { paddingTop: 24, paddingBottom: 12, color: '#3a3a3a', fontSize: 14, fontWeight: 'bold' },
        shopItem: { display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 4, marginTop: 8, paddingLeft: 16, paddingTop: 12, paddingBottom: 12, maxWidth: 300, width: '100%' },
        icon: { fontSize: 20, height: 48, width: 48, textAlign: 'center', lineHeight: 48, color: '#000000' }
    });

    const rerender = useRerender();
    const words = useContext(WordsContext.context);

    const selectedLevelRef = useRef<WordSet | null>(null);

    useEffect(() => {
        const onBack = () => {
            if (selectedLevelRef.current) {
                selectedLevelRef.current = null;
                rerender();

                return true;
            }

            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

        return () => {
            selectedLevelRef.current = null;
            backHandler.remove();
        };
    }, []);

    function onSelectLevel(level: WordSet) {
        selectedLevelRef.current = level;
        rerender();
    }

    return (
        <View>
            <ScrollView style={{ marginTop: 16, marginBottom: 12 }}>
                {!selectedLevelRef.current && (
                    <View style={styles.itemList}>
                        {words.sets.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.8}
                                style={styles.shopItem}
                                onPress={() => onSelectLevel(item)}
                            >
                                <Text style={styles.icon}>{index + 1}</Text>
                                <View style={{ paddingLeft: 12 }}>
                                    <Text style={{ color: '#3a3a3a' }}>{item.name}</Text>
                                    <Text style={{ color: '#aaaaaa' }}>{item.words.length} {plural(item.words.length, 'słowo', 'słowa', 'słów')}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                {selectedLevelRef.current && (
                    <View style={styles.mainContainer}>
                        <NavHeader
                            title={selectedLevelRef.current?.name!}
                            subTitle={(selectedLevelRef.current?.words.length ?? 0) + ' ' + plural(selectedLevelRef.current?.words.length ?? 0, 'słowo', 'słowa', 'słów')}
                            onBack={() => { selectedLevelRef.current = null; rerender(); }}
                        />
                        <View style={styles.set}>
                            {selectedLevelRef.current.words.map((word, index) => (
                                <Text key={index}>{word.replace(/[\(\)]/g, '')}</Text>
                            ))}
                        </View>
                    </View>)}
            </ScrollView>
        </View>
    );
}


export default WordListScreen;