"use client"
import React, {useEffect, useState} from "react";
import {DeleteButton} from "@/components/deleteButton";
import Image from "next/image";
import {ListBlobResult} from "@vercel/blob";

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
                <DialogTrigger>Open</DialogTrigger>
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
                                    width={700}
                                    height={500}
                                />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
    )
}