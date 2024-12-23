"use client"
import React, {useEffect, useState} from "react";
import {DeleteButton} from "@/components/deleteButton";
import Image from "next/image";
import {ListBlobResult} from "@vercel/blob";
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

export const BlopImage: React.FC<Props> = ({ img }) => {
    const [imageSrc, setImageSrc] = useState<string>(img);



    return (
            <Dialog>
                <DialogTrigger><Images/></DialogTrigger>
                <DialogContent className="max-w-fit">
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
                                    width={1000}
                                    height={800}
                                />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
    )
}