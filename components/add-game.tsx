'use client';
import React, {useEffect, useState} from 'react';
import {Category, Product, ProductItem, User} from '@prisma/client';
import toast from 'react-hot-toast';
import {Container} from './container';
import {Title} from './title';
import {Button, Input} from '@/components/ui';
import {categoryUpdate, categoryCreate, categoryDelete} from '@/app/actions';

interface Props {
    category: Category[];
    product: Product[];
    productItem: ProductItem[];
}

export const AddGame: React.FC<Props> = ({category, product, productItem}) => {

    const [categoryAdd, setCategoryAdd] = React.useState('');


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


    const eventSubmitCreate = async () => {
        try {
            if (categoryAdd === '') {
                return toast.error('Ошибка при создании данных, пустое поле', {
                    icon: '❌',
                });
            }

            await categoryCreate({
                name: categoryAdd,
            });

            setCategoryAdd('');

            toast.error('Данные созданы 📝', {
                icon: '✅',
            });

        } catch (error) {
            return toast.error('Ошибка при создании данных', {
                icon: '❌',
            });
        }
    }

    const productFind = (item: any) => {
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

    const productItemFind = (item: any) => {
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

    return (
        <Container className="my-4">
            <div className="flex gap-4">
                <div className="w-[33%] text-ellipsis overflow-hidden whitespace-nowrap">

                    <Title text={`Category Add`} size="xs" className="font-bold"/>
                    <div className="flex w-full max-w-sm items-center space-x-2 mb-1">
                        <Input className="p-1 h-5" type='text'
                               value={categoryAdd}
                               onChange={e => {
                                   setCategoryAdd(e.target.value)
                               }
                               }/>
                        <Button
                            type="submit"
                            disabled={categoryAdd === ''}
                            onClick={eventSubmitCreate}
                        >Add</Button>
                    </div>

                    {category.map((item, index) => (
                        <div key={item.id} className="flex w-full max-w-sm items-center space-x-2 mb-1">
                            <Button className="p-1 h-5" onClick={() => productFind(item)}>{item.name}</Button>
                        </div>
                    ))}
                </div>
                {/*PRODUCT_LIST*/}
                <div className="w-[33%] text-ellipsis overflow-hidden whitespace-nowrap">
                    <Title text={categoryNameState} size="xs" className="font-bold"/>
                    {categoryIdRef.current !== 0 &&
                        <div className="flex w-full max-w-sm items-center space-x-2 mb-1">
                            <Input className="p-1 h-5" type='text'
                                   value={categoryAdd}
                                   onChange={e => {
                                       setCategoryAdd(e.target.value)
                                   }
                                   }/>
                            <Button
                                type="submit"
                                disabled={categoryAdd === ''}
                                onClick={eventSubmitCreate}
                            >Add</Button>
                        </div>
                    }

                    {categoryIdRef.current !== 0 && productFindState.map((item, index) => (
                        <div key={index}>
                            <Button className="p-1 h-5"
                                    onClick={e => productItemFind(productFindState[index])}>{item.name}</Button>
                        </div>
                    ))}
                </div>

                <div className="w-[33%] text-ellipsis overflow-hidden whitespace-nowrap">
                    <Title text={productNameState} size="xs" className="font-bold"/>
                    {productIdRef.current !== 0 &&
                        <div className="flex w-full max-w-sm items-center space-x-2 mb-1">
                            <Input className="p-1 h-5" type='text'
                                   value={categoryAdd}
                                   onChange={e => {
                                       setCategoryAdd(e.target.value)
                                   }
                                   }/>
                            <Button
                                type="submit"
                                disabled={categoryAdd === ''}
                                onClick={eventSubmitCreate}
                            >Add</Button>
                        </div>
                    }

                    {productIdRef.current !== 0 && productItemState.map((item, index) => (
                        <div key={index}>
                            {/*<p>{item.id}</p>*/}
                            <Title text={item.name} size="xs"/>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};
