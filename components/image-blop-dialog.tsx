"use client"
import React, {useState} from "react";
import Image from "next/image";
import { Images } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
    img: string | (() => string)
}

export const ImageBlopDialog: React.FC<Props> = ({ img }) => {
    const [imageSrc, setImageSrc] = useState<string>(img);



    return (
            <Dialog>
                <DialogTrigger><Images className="mr-2 ml-2"/></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                                <Image
                                    onError={() =>
                                        setImageSrc(
                                            "https://g7ttfzigvkyrt3gn.public.blob.vercel-storage.com/nfs/nfs_most_wanted_2005.jpg"
                                        ) // Устанавливаем запасное изображение
                                    }
                                    src={imageSrc}
                                    alt={''}
                                    width={500}
                                    height={500}
                                />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
    )
}