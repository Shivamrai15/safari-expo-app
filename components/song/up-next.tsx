import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { View, Text, TouchableOpacity } from 'react-native'
import { albumDuration, cn } from "@/lib/utils";
import { Image } from "expo-image";
import { useQueue } from "@/hooks/use-queue";


export const UpNext = () => {

    const { queue, shiftToTopOfQueue, replace } = useQueue();

    const handleDragEnd = ({ data, from, to }: any) => {
        if (from === 0 || to === 0) return;
        replace(data[to].id, from, to);
    };

    const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<any>) => {
        const index = getIndex();
        return (
            <TouchableOpacity 
                className="w-full flex flex-row items-center justify-between gap-x-4"
                activeOpacity={0.7}
                onLongPress={drag}
                onPress={()=>shiftToTopOfQueue(item.id)}
            >
                <Image
                    source={{ uri: item.image }}
                    style={{ width: 48, height: 48, borderRadius: 8 }}
                    contentFit="contain"
                />
                <View className="flex-1 flex flex-col gap-y-0.5">
                    <Text className="text-white font-semibold" numberOfLines={1} ellipsizeMode="tail" >{item.name}</Text>
                    <Text className="text-neutral-300 font-medium text-sm" numberOfLines={1} ellipsizeMode="tail" >{item.album.name}</Text>
                </View>
                <Text className="font-medium w-12 text-white" >{albumDuration(item.duration)}</Text>
            </TouchableOpacity>
        )
        
    }

    return (
        <DraggableFlatList
            data={queue}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onDragEnd={handleDragEnd}
        />
    )
}
