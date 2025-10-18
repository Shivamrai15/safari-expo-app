import { useQueue } from '@/hooks/use-queue';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from "react-native-draggable-flatlist";


export const UpNext = () => {
    const { replace, queue } = useQueue();

    const handleDragEnd = ({ data: newData, from, to }: any) => {
        console.log("Drag ended from index", from, "to index", to);
        // replace(newData);
    };

    const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<string>) => {
        return (
            <ScaleDecorator>
                <View
                    style={{
                        backgroundColor: isActive ? '#e0e0e0' : 'white',
                        opacity: isActive ? 0.8 : 1,
                        padding: 16,
                        marginBottom: 8,
                        marginHorizontal: 8,
                        borderRadius: 8,
                    }}
                >
                    <TouchableOpacity
                        onLongPress={drag}
                        disabled={isActive}
                        delayLongPress={150}
                        style={{ width: '100%' }}
                    >
                        <Text className="text-black font-medium">
                            {item}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScaleDecorator>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <DraggableFlatList
                data={[]}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={renderItem}
                onDragEnd={handleDragEnd}
                activationDistance={10}
                dragItemOverflow={true}
                containerStyle={{ flex: 1 }}
                simultaneousHandlers={[]}
            />
        </View>
    )
}
