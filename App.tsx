import { useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Teacher as TeacherIcon,
  Bag2 as BagIcon,
  Cup as CupIcon,
  TextalignLeft as ListIcon
} from 'iconsax-react-native';

import WordsContext from './contexts/words';
import StorageContext from './contexts/storage';
import ShopScreen from './screens/shop-screen';
import LevelSelectionScreen from './screens/learning-screen';
import WordListScreen from './screens/word-list-screen';
import AchievementsScreen from './screens/achievements-screen';


const Tab = createBottomTabNavigator();

function App() {
  const [words, setWords] = useState(WordsContext.initialValue);
  const [storage, setStorage] = useState(StorageContext.initialValue);

  return (
    <WordsContext.context.Provider value={words}>
      <StorageContext.context.Provider value={{ storage, setStorage } as any}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => (
              {
                //tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: '#eaeaea', height: 60, paddingLeft: 20, paddingRight: 20, borderTopWidth: 1, borderTopColor: '#c4c4c4', shadowColor: 'transparent', paddingTop: 6 },
                tabBarActiveTintColor: '#4080ff',
                tabBarInactiveTintColor: '#3a3a3a',
                tabBarIcon: ({ color, focused, size }) => {
                  switch (route.name) {
                    case 'LevelSelection':
                      return <TeacherIcon color={color} size={size} />;
                    case 'Shop':
                      return <BagIcon color={color} size={size} />;
                    case 'Achievements':
                      return <CupIcon color={color} size={size} />;
                    case 'WordList':
                      return <ListIcon color={color} size={size} />;
                    default:
                      return null;
                  }
                },
                tabBarLabel: ({ color }) => {
                  const labelContent = ({
                    LevelSelection: 'Nauka',
                    Shop: 'Sklep',
                    Achievements: 'Trofea',
                    WordList: 'Słówka'
                  })[route.name];

                  return <Text style={{ color, fontSize: 12, paddingBottom: 6, marginTop: -4 }}>{labelContent}</Text>
                },
                headerBackgroundContainerStyle: { height: 0 },
                headerTitle: () => null
              }
            )}
            
          >
            <Tab.Screen name="LevelSelection" component={LevelSelectionScreen} />
            <Tab.Screen name="Shop" component={ShopScreen} />
            <Tab.Screen name="Achievements" component={AchievementsScreen} />
            <Tab.Screen name="WordList" component={WordListScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </StorageContext.context.Provider>
    </WordsContext.context.Provider>
  );
}


export default App;