import { Fragment, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Error } from '@/components/error';
import Loader from '@/components/loader';
import { PUBLIC_BASE_URL } from '@/constants/api.config';
import { useAuth } from '@/hooks/use-auth';
import { useInfinite } from '@/hooks/use-infinite';
import { Mood } from '@/types/response.types';


interface Props {
    isAtEnd : boolean;
}

export const Moods = ({ isAtEnd }: Props) => {

    const { user } = useAuth();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfinite({
        url : `${PUBLIC_BASE_URL}/api/v2/mood`,
        paramKey : "",
        paramValue : "",
        queryKey : "moods",
        token : user?.token
    });

    useEffect(()=>{
        if(isAtEnd && hasNextPage){
            fetchNextPage();
        }
    }, [isAtEnd, hasNextPage, fetchNextPage]);


    if (status === "pending") {
        return  (
            <Loader />
        )
    }

    if (status === "error") {
        return <Error />;
    }

    return (
        <View className='w-full flex flex-row justify-between gap-y-4 flex-wrap'>
            {
                data?.pages.map((group, i)=>(
                    <Fragment key={i} >
                        {
                            group.items.map((mood: Mood) => (
                                <TouchableOpacity
                                    className='w-[48%] flex flex-row items-center justify-center p-4 rounded-2xl'
                                    style={{
                                        backgroundColor : mood.color
                                    }}
                                    key={mood.id}
                                    activeOpacity={0.7}
                                >
                                    <Text className='text-white font-semibold text-center'>
                                        {mood.name}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </Fragment>
                ))

            }
            {
                isFetchingNextPage && (<View className='w-full h-6'>
                    <Loader />
                </View>)
            }
        </View>
    )
}