import {Text, View } from 'react-native';
import { Tab } from '@/types/response.types';

interface Props {
    currentTab: Tab;
    query : string;
}

export const SongTab = ({ currentTab, query }: Props) => {
    return (
        <View className='mt-10 w-full'>
            <Text>all-tab</Text>
        </View>
    )
}