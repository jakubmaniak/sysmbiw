import { useContext } from 'react';

import StorageContext from '../contexts/storage';


function useStorage() {
    const { storage, setStorage } = useContext(StorageContext.context) as any;

    return {
        money: storage.money,
        setMoney: async (money: number) => {
            await storage.setMoney(money);
            setStorage((storage: any) => ({ ...storage, money }));
        },
        achievements: storage.achievements,
        setAchievements: async (achievements: string[]) => {
            await storage.setAchievements(achievements)
            setStorage((storage: any) => ({ ...storage, achievements }));
        }
    };
}


export default useStorage;