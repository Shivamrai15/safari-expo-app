import { View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInfinite } from '@/hooks/use-infinite';
import Loader from '@/components/loader';
import { Error } from '@/components/error';
import { format , isSameDay} from "date-fns";
import { Fragment, useEffect, useState } from 'react';
import { HistoryItem } from '@/types/response.types';
import { differenceBetweenHistory, historyPartition } from '@/lib/utils';
import { SongItem } from '@/ui/song/item';
import { PROTECTED_BASE_URL } from '@/constants/api.config';
import { useAuth } from '@/hooks/use-auth';
import { NetworkProvider } from '@/providers/network.provider';




const History = () => {

    const { user } = useAuth();
    const [atEnd, setAtEnd] = useState(false);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // buffer of 20px
        setAtEnd(isEnd);
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfinite({
        url : `${PROTECTED_BASE_URL}/api/v2/user/history`,
        paramKey : "" ,
        paramValue : "",
        queryKey:"user-history",
        token : user?.token,
        persist : false
    });

    useEffect(()=>{
        if(atEnd && hasNextPage){
            fetchNextPage();
        }
    }, [atEnd, hasNextPage, fetchNextPage]);

    if (status === "pending") {
        return (
            <Loader />
        )
    }

    if (status === "error") {
        return (
            <Error />
        )
    }

    return (
        <NetworkProvider>
            <SafeAreaView className='flex-1 bg-background'>
                <ScrollView className='flex-1 p-4' onScroll={handleScroll} scrollEventThrottle={16} >
                    <Text className='text-white text-2xl font-bold'>Your History</Text>
                    <View className='flex flex-col mt-10 gap-y-6'>
                        {
                            data?.pages.map((group, i)=>(
                                <Fragment key={i} >
                                    {
                                        group.items.map((history : HistoryItem, idx : number ) => (
                                            <Fragment key={history.id}>
                                                {
                                                    idx===0 && i===0 && ( isSameDay(new Date(history.createdAt), new Date()) ? 
                                                        (<Label label="Today" />):
                                                        (<Label label={differenceBetweenHistory(new Date(), new Date(history.createdAt))} />)
                                                    )
                                                }
                                                <View className='w-full flex flex-col gap-y-0.5'>
                                                    <Text className='text-sm text-zinc-400'>
                                                        { format(new Date(history.createdAt), "hh:mm a")}
                                                    </Text>
                                                    <SongItem data={history.song} />
                                                </View>
                                                {
                                                    <Label label={historyPartition(data?.pages, i, group.items, idx)} />
                                                }
                                            </Fragment>
                                        ))
                                    }
                                </Fragment>
                            ))
                        }
                    </View>
                    {
                        isFetchingNextPage && (<View className='w-full h-6'>
                            <Loader />
                        </View>)
                    }
                    <View className='h-40' />
                </ScrollView>
            </SafeAreaView>
        </NetworkProvider>
    )
}


const Label = ({ label }: { label: string|null })=>{

    if (!label) {
        return null;
    }

    return (
        <View className='flex items-center justify-center'>
            <View className='w-fit rounded-full py-1 px-4 bg-neutral-800 shadow-black shadow-md'>
                <Text className='text-neutral-200 font-medium'>{label}</Text>
            </View>
        </View>
    )
}

export default History;