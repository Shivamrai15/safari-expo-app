import { FlatList, Text, View } from "react-native";
import { Album, Artist, Song } from "@/types/response.types";
import { FlatCard } from "../song/flat-card";


interface Props {
    data : (Song & { album: Album, artists : Artist[] })[];
}

export const ListenAgainCarousel = ({ data }: Props) => {

    let subData = [];
    for (let i = 0; i < data.length; i += 4) {
        subData.push(data.slice(i, i + 4));
    }

    // console.log(JSON.stringify(subData, null, 2));
    
    return (
        <View className="flex flex-col gap-y-4 pt-10">
            <Text className="text-white font-bold text-2xl block">
                Listen Again
            </Text>
            <FlatList
                data={subData}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                keyExtractor={(item, index) => `group-${index}`} // Add keyExtractor
                renderItem={({ item, index }) => (
                    <View className="flex w-72 flex-col gap-y-3" key={`group-${index}`}>
                        {
                            item.map((song) => (
                                <FlatCard
                                    key={song.id}
                                    song={song}
                                />
                            ))
                        }
                    </View>
                )}
            />
        </View>
    )
}
