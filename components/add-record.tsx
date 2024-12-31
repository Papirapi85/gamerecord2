'use client';
import React, {useEffect, useState} from 'react';
import {Category, Product, ProductItem, User} from '@prisma/client';
import toast from 'react-hot-toast';
import {Container} from './container';
import {Title} from './title';
import {Button, Input} from '@/components/ui';
import {addRecordActions, uploadImage} from '@/app/actions';
import {PutBlobResult} from '@vercel/blob';
import ImageAddBlobScreen from "@/components/image-add-blop-screen";
import imageCompression from "browser-image-compression";
import TimeInput from "@/components/time-input";


interface Props {
    user: User;
    category: Category[];
    product: Product[];
    productItem: ProductItem[];
    gameRecords: any[];
}

export const AddRecord: React.FC<Props> = ({user, category, product, productItem, gameRecords}) => {

    const [formData, setFormData] = useState<FormData | null>(null); // State для хранения FormData

    // Callback для получения FormData из ImageAddBlobScreen
    const handleFormDataReady = (data: FormData) => {
        console.log("Получен объект FormData:", data);
        //addRecordIMAGE(data).then(()=>imgRef.current = false)
        imgRef.current = true;
        setFormData(data); // Сохраняем FormData
    };

    const [categoryNameState, setCategoryNameState] = React.useState('');
    const [productNameState, setProductNameState] = React.useState('');
    const [productItemNameState, setProductItemNameState] = React.useState('');
    const [timestatState, setTimestatState] = React.useState('');
    const [videoState, setVideoState] = React.useState('');
    const [productFindState, setProductFindState] = React.useState<Product[]>([]);
    const [productItemState, setProductItemState] = React.useState<ProductItem[]>([]);

    const categoryIdRef = React.useRef(0);
    const productIdRef = React.useRef(0);
    const productItemIdRef = React.useRef(0);
    const addRecordViewRef = React.useRef(false);
    const imgRef = React.useRef(true);
    const videSetRef = React.useRef(true);

    const productFind = (item : any) => {
        categoryIdRef.current = item.id;
        productIdRef.current = 0;
        let array = []
        for (let i = 0; i < product.length; i++) {
            if (product[i].categoryId === item.id) {
                array.push(product[i]);
            }
        }
        setProductFindState(array);
        setCategoryNameState(item.name);
        addRecordViewRef.current = false;
    }

    const productItemFind = (item : any) => {
        productIdRef.current = item.id;
        //console.log(productIdRef.current);
        let array = []
        for (let i = 0; i < productItem.length; i++) {
            if (productItem[i].productId === item.id) {
                array.push(productItem[i]);
            }
        }
        setProductItemState(array);
        setProductNameState(item.name);
        addRecordViewRef.current = false;
    }

    const selectFile = async (e: any) => {
        if (e.target.files[0]) {

            const data = new FormData();
            if (e.target.files[0].size > 2 * 1000 * 1024) {
                const options = {
                    maxSizeMB: 1, // Максимальный размер в мегабайтах
                    maxWidthOrHeight: 1920, // Максимальная ширина или высота
                    useWebWorker: true, // Использовать веб-воркеры для повышения производительности
                };
                const compressedFile = await imageCompression(e.target.files[0], options);
                data.append('image', compressedFile, e.target.files[0].name)
                setFormData(data)
                imgRef.current = true;

            } else {
                data.append('image', e.target.files[0], e.target.files[0].name)
                setFormData(data)
                imgRef.current = true;
            }
        }
    }

    const addRecordIMAGE = async () => {
        await uploadImage(formData as FormData).then(blop => {
            if ('error' in blop) {
                return toast.error(`Failed to upload image: ${blop.error}`, {icon: '❌',});
            }
            toast.error('Image create 📝', {icon: '✅',});
            addRecordFB(blop);
        });
    }

    const addRecordFB = async (blop: PutBlobResult ) => {
        try {
            await addRecordActions({
                userId: user.id,
                categoryId: categoryIdRef.current,
                productId: productIdRef.current,
                productItemId: productItemIdRef.current,
                timestate: timestatState,
                video: videoState,
                img: blop.url,
            });
            imgRef.current = true;
            toast.error('Record create 📝', {
                icon: '✅',
            });

        } catch (error) {
            return toast.error('Error create data', {
                icon: '❌',
            });
        }
    }

    const handleTimeChange = (newTime : string) => {
        setTimestatState(newTime);
    };


    return (
        <Container className="mt-4">

            {/*CATEGORY_LIST*/}
            <div className="flex gap-4">
                <div className="w-[22%] text-ellipsis overflow-hidden whitespace-nowrap">
                    <Title text={`Category List`} size="xs" className="font-bold"/>
                    {category.map((item) => (
                        <div key={item.id}>
                            <Button className="p-1 h-5" onClick={() => productFind(item)}>{item.name}</Button>
                        </div>
                    ))}
                </div>

                {/*PRODUCT_LIST*/}
                <div className="w-[22%] text-ellipsis overflow-hidden whitespace-nowrap">
                    <Title text={`${categoryNameState}`} size="xs" className="font-bold"/>
                    <Title text={`Game List`} size="xs"/>
                    {categoryIdRef.current !== 0 && productFindState.map((item, index) => (
                        <div key={index}>
                            <Button className="p-1 h-5" onClick={e => productItemFind(productFindState[index])}>{item.name}</Button>
                        </div>
                    ))}
                </div>

                {/*PRODUCT_ITEM*/}
                <div className="w-[22%] text-ellipsis overflow-hidden whitespace-nowrap">
                    <Title text={`${productNameState}`} size="xs" className="font-bold"/>
                    <Title text={`Road List`} size="xs"/>
                    {productIdRef.current !== 0 && productItemState.map((item, index) => (
                        <div key={index} >
                                {/*<p>{item.id}</p>*/}
                                <Button className="p-1 h-5"
                                    onClick={() => {
                                        productItemIdRef.current = productItemState[index].id;
                                        addRecordViewRef.current = true;
                                        setProductItemNameState(productItemState[index].name);
                                    }}
                                >{item.name}</Button>
                        </div>
                    ))}
                </div>

                {/*GAME_RECORD_CREATE*/}
                <div className="w-[30%] text-ellipsis overflow-hidden whitespace-nowrap ml-1">
                    <Title text={`${categoryNameState}`} size="xs" className="font-bold"/>
                    <Title text={`${productNameState}`} size="xs" className="font-bold"/>
                    <Title text={`${productItemNameState}`} size="xs" className="font-bold"/>
                    {(productItemIdRef.current !== 0 && addRecordViewRef.current === true) &&
                        <div>
                            <Input
                                type="file"
                                id="image"
                                name="image"
                                accept=".jpg, .jpeg, .png, image/*"
                                required
                                onChange={selectFile}
                            />

                            <ImageAddBlobScreen onFormDataReady={handleFormDataReady} />

                            <div className="m-2">
                                <TimeInput onTimeChange={handleTimeChange}/>
                            </div>

                            <div className="m-2">
                                <Input type='text'
                                       placeholder="VIDEO YOUTUBE"
                                       onChange={e => {
                                           if(e.target.value.includes("watch?v=")){
                                               setVideoState(e.target.value)
                                               videSetRef.current = false
                                           }else{
                                               videSetRef.current = true
                                               setVideoState("")
                                           }
                                       }}
                                />
                            </div>

                            {formData && (
                            <Button type="submit"
                                    disabled={timestatState === "" || imgRef.current === false  }
                                    onClick={() => {
                                        if (videSetRef.current) {
                                            addRecordIMAGE().then(()=>  toast.error('Error create Link video', {icon: '❌',}));
                                        } else {
                                            addRecordIMAGE().then(()=>  toast.error('Create Link video', {icon: '✅',}));
                                        }
                                    }}
                            >Upload</Button>
                            )}
                        </div>
                    }
                </div>
            </div>
        </Container>
    );
};
