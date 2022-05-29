import React, { useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, BackHandler } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';


import plural from '../helpers/plural';
import useRerender from '../hooks/use-rerender';
import useStorage from '../hooks/use-storage';
import WordsContext, { WordSet } from '../contexts/words';
import NavHeader from '../components/nav-header';


function LevelSelectionScreen({ navigation }: BottomTabScreenProps<ParamListBase, 'LevelSelection'>) {
    const styles = StyleSheet.create({
        itemList: { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 16 },
        title: { paddingTop: 24, paddingBottom: 12, color: '#3a3a3a', fontSize: 14, fontWeight: 'bold' },
        shopItem: { display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 4, marginTop: 8, paddingLeft: 16, paddingTop: 12, paddingBottom: 12, maxWidth: 300, width: '100%' },
        icon: { fontSize: 20, height: 48, width: 48, textAlign: 'center', lineHeight: 48, color: '#000000' }
    });

    const rerender = useRerender();
    const words = useContext(WordsContext.context);
    const { money, setMoney } = useStorage();

    const selectedLevelRef = useRef<WordSet | null>(null);
    const [currentWord, setCurrentWord] = useState({
        index: -1,
        full: '',
        prefix: '',
        postfix: '',
        highlighted: ''
    });
    const [selectingLocked, setSelectingLocked] = useState(false);
    const [answerContent, setAnswerContent] = useState(['', '']);
    const [answerStates, setAnswerStates] = useState({ left: 'normal', right: 'normal' });

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

    function nextWord() {
        if (!selectedLevelRef.current) return;

        let index = 0;
        
        if (selectedLevelRef.current.words.length > 1) {
            do {
                index = Math.floor(Math.random() * selectedLevelRef.current.words.length);
            } while (index === currentWord.index);
        }

        const fullWord = selectedLevelRef.current.words[index];
        const [prefix, highlighted, postfix] = fullWord.split(/[\(\)]/);

        setCurrentWord({
            index,
            full: fullWord,
            prefix,
            highlighted,
            postfix
        });

        const correct = highlighted;
        const wrong = ({ rz: 'ż', ż: 'rz', u: 'ó', ó: 'u', h: 'ch', ch: 'h' })[correct];
        const [left, right] = (Math.random() > 0.5 ? [correct, wrong] : [wrong, correct]);

        setAnswerContent([left!, right!]);
    }

    function renderWord(word: string) {
        const [prefix, highlighted, postfix] = word.split(/[\(\)]/);

        return (
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: 32 }}>{currentWord.prefix}</Text>
                <Text style={{ color: '#4080ff', fontWeight: 'bold', fontSize: 32 }}>_</Text>
                <Text style={{ fontSize: 32 }}>{currentWord.postfix}</Text>
            </View>
        );
    }

    function buttonStateToStyle(state: string) {
        if (state === 'correct') return { backgroundColor: 'green' };
        else if (state === 'incorrect') return { backgroundColor: 'red' };
        else return { backgroundColor: '#4080ff' };
    }

    function renderAnswers() {
        const [left, right] = answerContent;

        return (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ padding: 16, paddingLeft: 32, paddingRight: 32, borderRadius: 4, margin: 30, ...buttonStateToStyle(answerStates.left) }}
                    onPress={() => selectAnswer('left', left === currentWord.highlighted)}
                >
                    <Text style={{ color: '#ffffff', fontSize: 24 }}>{left}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ padding: 16, paddingLeft: 32, paddingRight: 32, borderRadius: 4, margin: 30, ...buttonStateToStyle(answerStates.right) }}
                    onPress={() => selectAnswer('right', right === currentWord.highlighted)}
                >
                    <Text style={{ color: '#ffffff', fontSize: 24 }}>{right}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function selectAnswer(side: string, correct: boolean) {
        if (selectingLocked) return;

        setSelectingLocked(true);
        setAnswerStates({ ...answerStates, [side]: correct ? 'correct' : 'incorrect' });

        if (correct) {
            setMoney(money + 1);
        }

        setTimeout(() => {
            setSelectingLocked(false);
            setAnswerStates({ left: 'normal', right: 'normal' });

            nextWord();
        }, 800);
    }

    function onSelectLevel(level: WordSet) {
        selectedLevelRef.current = level;
        nextWord();
    }

    return (
        <ScrollView>
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
                <View style={{ display: 'flex', height: 600 }}>
                    <NavHeader title={selectedLevelRef.current.name} onBack={() => { selectedLevelRef.current = null; rerender(); }} />
                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {renderWord(selectedLevelRef.current.words[0])}
                        {renderAnswers()}
                    </View>
                </View>
            )}
        </ScrollView>
    );
}


export default LevelSelectionScreen;