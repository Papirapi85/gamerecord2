'use client';
import React, {Suspense, useEffect, useRef, useState} from 'react';
import {CarModel, GameRecords, User} from '@prisma/client';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Container} from "@/components/container";
import {Button, Input, Select} from "@/components/ui";
import {addRecordActions, editRecordActions, uploadImage} from "@/app/actions";
import toast from "react-hot-toast";
import ImageAddBlobScreen from "@/components/image-add-blop-screen";
import {PutBlobResult} from "@vercel/blob";
import { del } from '@vercel/blob';
import {DeleteRecordDialog} from "@/components/delete-record-dialog";
import {ImageBlopDialog} from "@/components/image-blop-dialog";
import TimeInput from "@/components/time-input";
import imageCompression from 'browser-image-compression';
import {SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {number} from "zod";

interface Props {
    user: User;
    gameRecords: any[];
    className?: string;
    carModel: CarModel[];
}

export const EditGameRecord: React.FC<Props> = ({ user, gameRecords, carModel, className}) => {

    const [formDataImage, setFormDataImage] = useState<FormData | null>(null);

    const [timeState, setTimeState] = useState('');
    const [linkVideo, setLinkVideo] = useState('');

    const idRef = useRef("");
    const categoryIdRef = useRef("");
    const productIdRef = useRef("");
    const productItemIdRef = useRef("");
    const checkButtonUpdateRef = useRef(0);

    const selectCarRef = React.useRef<number | null>(null);
    const [carModelArrayState, setCarModelArrayState] = React.useState<CarModel[]>(carModel);



    const handleFormDataReady = (data: FormData) => {
        console.log("Получен объект FormData:", data);
        setFormDataImage(data)
    };

    const addRecordIMAGE = async (img : any) => {
        await uploadImage(formDataImage as FormData).then(blop => {
            if ('error' in blop) {
                return toast.error(`Failed to upload image: ${blop.error}`, {icon: '❌',});
            }
            toast.error('Image edit 📝', {icon: '✅',});
            editRecord(blop, img);
        });
    }

    const editRecord = async (blop: PutBlobResult, img : any) => {
        try {
            await editRecordActions({
                id : idRef.current,
                userId: user.id,
                categoryId: categoryIdRef.current,
                productId: productIdRef.current,
                productItemId: productItemIdRef.current,
                timestate: timeState,
                img: blop.url,
                linkVideo: linkVideo,
            })

            await fetch('/api/blop/del/' + encodeURIComponent(img), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            toast.error('Record edit 📝', {
                icon: '✅',
            });

        } catch (error) {
            return toast.error('Error edit data', {
                icon: '❌',
            });
        }
    }

   // const [timeValue, setTimeValue] = useState('');

    const handleTimeChange = (newTime : string, id : number) => {
        setTimeState(newTime);
        checkButtonUpdateRef.current = id;
    };


    return (
        <Container className="w-[100%]">
            <Table className="table-fixed">
                <TableCaption>Gamerecord.online</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[20%] text-left overflow-hidden text-ellipsis whitespace-nowrap">GAME</TableHead>
                        <TableHead className="w-[30%] text-left overflow-hidden text-ellipsis whitespace-nowrap">Edit</TableHead>
                        <TableHead className="w-[33%] text-left overflow-hidden text-ellipsis whitespace-nowrap">Edit</TableHead>
                        <TableCell className="w-[17%] text-right"></TableCell>
                    </TableRow>
                </TableHeader>


                <Suspense>
                    {
                        gameRecords.map((records, index) => (

                            <TableBody key={index} className="border-b border-b-gray-200 dark:border-b-gray-800">
                                <TableRow>
                                    <TableCell>
                                        <div className="text-ellipsis overflow-hidden whitespace-nowrap">{records.user.fullName}</div>
                                        <div className="text-ellipsis overflow-hidden whitespace-nowrap">{records.category.name}</div>
                                        <div className="text-ellipsis overflow-hidden whitespace-nowrap">{records.product.name}</div>
                                        <div className="text-ellipsis overflow-hidden whitespace-nowrap">{records.productItem.name}</div>
                                    </TableCell>

                                    <TableCell>
                                    <div>{records.timestate}</div>
                                        {/*<div>{timeState}</div>*/}
                                        <TimeInput onTimeChange={handleTimeChange} id={records.id}/>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                                            <input
                                                type="file"
                                                id="image"
                                                name="image"
                                                accept=".jpg, .jpeg, .png, image/*"
                                                required
                                                onChange={async (e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        const data = new FormData();
                                                        if (e.target.files[0].size > 2 * 1000 * 1024) {
                                                            console.log("yes")
                                                            const options = {
                                                                maxSizeMB: 2, // Максимальный размер в мегабайтах
                                                                maxWidthOrHeight: 1920, // Максимальная ширина или высота
                                                                useWebWorker: true, // Использовать веб-воркеры для повышения производительности
                                                            };
                                                            const compressedFile = await imageCompression(e.target.files[0], options);
                                                            data.append('image', compressedFile, e.target.files[0].name)
                                                            setFormDataImage(data)
                                                        } else {
                                                            console.log("no")
                                                            data.append('image', e.target.files[0], e.target.files[0].name)
                                                            setFormDataImage(data)
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                                            <ImageAddBlobScreen onFormDataReady={handleFormDataReady}/>
                                        </div>
                                        <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                                            <Input className="h-5 mr-1"
                                                   type='text'
                                                   placeholder="VIDEO YOUTUBE"
                                                   onChange={e => {
                                                       if (e.target.value.includes("watch?v=")) {
                                                           setLinkVideo(e.target.value)
                                                       } else {
                                                           setLinkVideo("")
                                                       }
                                                   }}
                                            />

                                            <div>
                                                {carModelArrayState.length !== 0 &&
                                                    <Select onValueChange={(e) => {

                                                        selectCarRef.current = Number(e)
                                                        console.log(selectCarRef.current)

                                                    }}>
                                                        <SelectTrigger className="mr-1 w-[100%] h-5">
                                                            <SelectValue placeholder="Car Model"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {carModelArrayState
                                                                    .filter((item) => item.productId === records.productId) // Filter by records.productId
                                                                    .map((item) =>  (
                                                                    <SelectItem key={item.id} value={String(item.id)}>
                                                                        {item.name}
                                                                    </SelectItem>

                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                }
                                            </div>
                                        </div>

                                    </TableCell>


                                    <TableCell className="text-right">
                                        <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                                            <Button className="w-[60px] h-[20px] mb-1"
                                                    disabled={!formDataImage || checkButtonUpdateRef.current !== records.id}
                                                    onClick={() => {
                                                        idRef.current = records.id;
                                                        categoryIdRef.current = records.categoryId;
                                                        productIdRef.current = records.productId;
                                                        productItemIdRef.current = records.productItemId;
                                                        addRecordIMAGE(records.img).then(() => toast.error('Record edit 📝', {icon: '✅'}));
                                                    }}
                                            >Update</Button>
                                        </div>
                                        <div>
                                        <DeleteRecordDialog id={records.id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>

                        ))}
                </Suspense>
            </Table>
        </Container>
    );
};
