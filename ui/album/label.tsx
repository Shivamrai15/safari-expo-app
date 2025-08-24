import { Text, View } from "react-native";
import { format } from "date-fns";
import { Label } from "@/types/response.types";



interface Props {
    label : Label
    releaseDate : string
}

export const AlbumLabel = ({ label, releaseDate }: Props) => {
    return (
        <View className="w-full flex flex-col gap-y-1 px-6 py-8">
            <Text className="text-zinc-200 font-medium">
                {format(new Date(releaseDate), "MMMM d, yyyy")}
            </Text>
            <Text className="text-zinc-200 text-sm font-medium">
                {label.name}
            </Text>
        </View>
    )
}

