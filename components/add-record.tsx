'use client';
import React, {useEffect} from 'react';
import {Category, Product, ProductItem, User} from '@prisma/client';
import toast from 'react-hot-toast';
import {Container} from './container';
import {Title} from './title';
import {Button, Input} from '@/components/ui';
import {productItemDelete, productItemUpdate, productItemCreate} from '@/app/actions';


interface Props {
    user: User;
    category: Category[];
    product: Product[];
    productItem: ProductItem[];
    gameRecords: any[];
}

export const AddRecord: React.FC<Props> = ({user, category, product, productItem, gameRecords}) => {

    const [categoryNameState, setCategoryNameState] = React.useState('');
    const [productNameState, setProductNameState] = React.useState('');
    const [productItemNameState, setProductItemNameState] = React.useState('');

    //const [productState, setProductState] = React.useState<Product[]>(product);
    const [productFindState, setProductFindState] = React.useState<Product[]>([]);

    const [productItemState, setProductItemState] = React.useState<ProductItem[]>([]);
    // const [productItemFindState, setProductItemFindState] = React.useState<ProductItem[]>([]);
    // const [productItemFindState2, setProductItemFindState2] = React.useState<ProductItem[]>([]);

    const [createState, setCreateState] = React.useState("");

    const categoryIdRef = React.useRef(null);
    const productIdRef = React.useRef(null);

    // useEffect(() => {
    //     //setProductItemState(productItem)
    //     let array: ProductItem[] = []
    //     if(productIdRef.current !== null) {
    //         for (let i = 0; i < productItem.length; i++) {
    //             if (productItem[i].productId === productIdRef.current) {
    //                 array.push(productItem[i]);
    //             }
    //         }
    //         setProductItemFindState(array);
    //         setProductItemFindState2(array);
    //         setCreateState('')
    //     }
    // }, [productItem]);

    // useEffect(() => {
    //     setProductItemFindState([]);
    //     setProductItemFindState2([]);
    // }, [categoryIdRef.current]);


    const productFind = (item : any) => {
        categoryIdRef.current = item.id;
        let array = []
        for (let i = 0; i < product.length; i++) {
            if (product[i].categoryId === item.id) {
                array.push(product[i]);
            }
        }
        setProductFindState(array);
        setCategoryNameState(item.name);
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
    }

    const eventSubmitUpdate = async (data: any) => {
        try {
            if(data.name === '') {
                return toast.error('Ошибка при создании данных, пустое поле', {
                    icon: '❌',
                });
            }
            await productItemUpdate({
                id: data.id,
                name: data.name,
            });
            toast.error('Данные обновлены 📝', {
                icon: '✅',
            });
        } catch (error) {
            return toast.error('Ошибка при обновлении данных', {
                icon: '❌',
            });
        }
    }
    const eventSubmitDelete = async (item: any) => {
        try {
            await productItemDelete({
                id: item.id,
            });
            toast.error('Данные удалены📝', {
                icon: '✅',
            });
        } catch (error) {
            return toast.error('Ошибка при удалении данных', {
                icon: '❌',
            });
        }
    }
    const eventSubmitCreate = async () => {
        try {
            if(createState === '') {
                return toast.error('Error create data, filed empty', {
                    icon: '❌',
                });
            }
            await productItemCreate({
                name: createState,
                productId: productIdRef.current,
            });
            toast.error('Data create 📝', {
                icon: '✅',
            });
        } catch (error) {
            return toast.error('Error create data', {
                icon: '❌',
            });
        }
    }

    return (
        <Container className="mt-4">

            {/*<Title text={`#${data.role}`} size="md" className="font-bold"/>*/}

            {/*CATEGORY*/}
            <div className="flex">
                <div className="flex-1 w-[20%]">
                    <Title text={`Category List`} size="md" className="font-bold"/>
                    {category.map((item) => (
                        <div key={item.id} className="flex w-full max-w-sm items-center space-x-2 mb-1">
                            <Button onClick={() => productFind(item)}>{item.name}</Button>
                        </div>
                    ))}
                </div>

                {/*PRODUCT_LIST*/}
                <div className="flex-1 w-[20%]">
                    <Title text={`${categoryNameState}`} size="md" className="font-bold"/>
                    <Title text={`Product List`} size="xs"/>
                    {categoryIdRef.current !== null && productFindState.map((item, index) => (
                        <div key={index} className="flex w-full max-w-sm items-center space-x-2 mb-1">
                            {/*<p>{item.id}</p>*/}
                            <Button
                                onClick={e => productItemFind(productFindState[index])}
                            >{item.name}</Button>
                        </div>
                    ))}
                </div>

                {/*PRODUCT_ITEM*/}
                <div className="flex-1 w-[30%]">
                    <Title text={`${productNameState}`} size="md" className="font-bold"/>
                    <Title text={`Product Item Edit`} size="xs"/>
                    {productIdRef.current !== null && productItemState.map((item, index) => (
                        <div key={index} className="flex w-full max-w-sm items-center space-x-2 mb-1">
                                {/*<p>{item.id}</p>*/}
                                <Button
                                    onClick={e => setProductItemNameState(productItemState[index].name)}
                                >{item.name}</Button>
                        </div>
                    ))}
                </div>

                {/*GAME_RECORD_CREATE*/}
                <div className="flex-1 w-[25%] ml-5">
                    <Title text={`${productItemNameState}`} size="md" className="font-bold"/>
                    <Title text={`Product Add`} size="xs"/>
                    {productIdRef.current !== null &&
                        <div className="flex w-full max-w-sm items-center space-x-2 mb-1">
                            <Input type='text'
                                   value={createState}
                                   onChange={e => {
                                       setCreateState(e.target.value)
                                   }}
                            />
                            <Button
                                type="submit"
                                disabled={createState === ''}
                                onClick={eventSubmitCreate}
                            >Add</Button>
                        </div>
                    }
                </div>
            </div>
        </Container>
    );
};
