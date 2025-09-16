import { Image } from 'expo-image';
import { View, Text, TouchableOpacity } from 'react-native';
import { albumDuration, cn } from '@/lib/utils';
import { SongResponse } from '@/types/response.types';
import { useQueue } from '@/hooks/use-queue';
import { TrashIcon } from '@/constants/icons';
import { useDownloads } from '@/hooks/use-downloads';
import { useState } from 'react';
import { DownloadManager } from '@/services/download';


interface Props {
    className?: string;
    data : SongResponse & {
        download : {
            isDownloading: boolean;
            downloadProgress: number;
            localPath?: string;
            localImagePath?: string;
            isDownloaded: boolean;
        }
    }
}



export const OfflineItem = ({ className, data }: Props) => {

    const { priorityEnqueue } = useQueue();
    const { removeSong } = useDownloads();
    const [isDeleting, setIsDeleting] = useState(false);
    const downloadManager = DownloadManager.getInstance();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await downloadManager.deleteDownload(data.id)
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <TouchableOpacity 
            className={cn(
                "w-full flex flex-row items-center justify-between gap-x-4",
                className
            )}
            activeOpacity={0.7}
            onPress={()=>priorityEnqueue([data])}
        >
            <Image
                source={{ uri: data.image }}
                style={{ width: 48, height: 48, borderRadius: 8 }}
                contentFit="contain"
            />
            <View className="flex-1 flex flex-col gap-y-0.5">
                <Text className="text-white font-semibold" numberOfLines={1} ellipsizeMode="tail" >{data.name}</Text>
                <Text className="text-neutral-300 font-medium text-sm" numberOfLines={1} ellipsizeMode="tail" >{data.album.name}</Text>
            </View>
            <Text className="font-medium w-12 text-white" >{albumDuration(data.duration)}</Text>
            <TouchableOpacity 
                onPress={handleDelete}
                disabled={isDeleting}
                style={{ opacity: isDeleting ? 0.5 : 1 }}
            >
                <Image
                    source={TrashIcon}
                    style={{ width: 24, height: 24 }}
                    contentFit="contain"
                />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}