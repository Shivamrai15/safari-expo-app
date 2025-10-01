import { Error } from '@/components/ui/error';
import { PrimaryLoader, SecondaryLoader } from '@/components/ui/loader';
import { useAuth } from '@/hooks/use-auth';
import { useInfinite } from '@/hooks/use-infinite';
import Feather from '@expo/vector-icons/Feather';
import { Fragment, useEffect } from 'react';
import { Text, View } from 'react-native';
import { SongItem } from '../song/item';
import { SongResponse } from '@/types/response.types';

interface Props {
    url : string;
    queryKey : string;
    isAtEnd : boolean;
}

export function Songs({ url, queryKey, isAtEnd }: Props) {

    const { user } = useAuth();

    const { data, status, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfinite({
        url,
        queryKey,
        token : user?.token,
        paramKey : "",
        paramValue : ""
    });

    useEffect(()=>{

        if(isAtEnd && hasNextPage){
            fetchNextPage();
        }
    }, [isAtEnd, hasNextPage]);

    if (status === "pending") {
        return <PrimaryLoader />;
    }

    if (status === "error") {
        return <Error />;
    }

    return (
        <View className="w-full flex flex-col gap-y-6 px-6">
            <View className="w-full flex flex-row items-center justify-between gap-4">
                <View className="flex flex-row items-center gap-4 font-semibold text-lg">
                    <Text className="w-14 text-white text-xl font-bold text-center">#</Text>
                    <Text className="text-white text-xl font-semibold">Title</Text>
                </View>
                <View className="flex items-center w-14 justify-center">
                    <Feather name="clock" size={20} color="white" />
                </View>
            </View>
            <View className="bg-zinc-600 h-0.5 w-full rounded-full"/>
            <View className='flex flex-col gap-y-5'>
                {
                    data?.pages.map((group, i)=>(
                            <Fragment key={i} >
                                {
                                    group.items.map((song: SongResponse) => (
                                        <SongItem key={song.id} data={song} />
                                    ))
                                }
                            </Fragment>
                        ))

                }
                {
                    isFetchingNextPage && (<View className='w-full h-6'>
                        <SecondaryLoader />
                    </View>)
                }
            </View>
        </View>
    )
}