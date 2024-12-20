'use client';
import React, {useEffect} from 'react';
import {Category, Product, ProductItem, User} from '@prisma/client';
import toast from 'react-hot-toast';
import {Container} from './container';
import {Title} from './title';
import {Button, Input} from '@/components/ui';
import {productItemDelete, productItemUpdate, productItemCreate} from '@/app/actions';


interface Props {
    data: User;
    category: Category[];
    product: Product[];
    productItem: ProductItem[];
}

export const AdminProductItem: React.FC<Props> = ({data, category, product, productItem}) => {

    const [categoryNameState, setCategoryNameState] = React.useState('');
    const [productNameState, setProductNameState] = React.useState('');

    const [productState, setProductState] = React.useState<Product[]>(product);
    const [productFindState, setProductFindState] = React.useState<Product[]>([]);

    const [productItemState, setProductItemState] = React.useState<ProductItem[]>(productItem);
    const [productItemFindState, setProductItemFindState] = React.useState<ProductItem[]>([]);
    const [productItemFindState2, setProductItemFindState2] = React.useState<ProductItem[]>([]);

    const [createState, setCreateState] = React.useState("");

    const categoryIdRef = React.useRef(null);
    const productIdRef = React.useRef(null);

    // useEffect(() => {
    //     setProductState(product)
    //     let array: Product[] = []
    //     if(categoryIdRef.current !== null) {
    //         for (let i = 0; i < product.length; i++) {
    //             if (product[i].categoryId === categoryIdRef.current) {
    //                 array.push(product[i]);
    //             }
    //         }
    //         setProductFindState(array);
    //         setCreateState('')
    //     }
    // }, [product]);

    useEffect(() => {
        //setProductItemState(productItem)
        let array: ProductItem[] = []
        if(categoryIdRef.current !== null) {
            for (let i = 0; i < productItem.length; i++) {
                if (productItem[i].productId === productIdRef.current ) {
                    array.push(productItem[i]);
                }
            }
            setProductItemFindState(array);
            setProductItemFindState2(array);
            setCreateState('')
        }
    }, [productItem]);


    const productFind = (item : any) => {
        categoryIdRef.current = item.id;
        let array = []
        for (let i = 0; i < productState.length; i++) {
            if (productState[i].categoryId === item.id) {
                array.push(productState[i]);
            }
        }
        setProductFindState(array);
        setCategoryNameState(item.name);
    }

    const productItemFind = (item : any) => {
        productIdRef.current = item.id;
        //console.log(productIdRef.current);
        let array = []
        for (let i = 0; i < productItemState.length; i++) {
            if (productItemState[i].productId === item.id) {
                array.push(productItemState[i]);
            }
        }
        setProductItemFindState(array);
        setProductItemFindState2(array);
        setProductNameState(item.name);
    }


    const eventHandler = (data: any, value: any) => {
        setProductItemFindState2(
            productItemFindState.map((item) =>
                item.id === data.id ? {...item, name: value} : item
            )
        )
    };

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
            console.log('productIdRef.current ' + productIdRef.current)
            if(createState === '') {
                return toast.error('Error create data, filed empty', {
                    icon: '❌',
                });
            }
            console.log('createState ', createState);
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
                        <div key={item.id} className="flex w-full max-w-sm items-center space-x-2 mb-1">
                            {/*<p>{item.id}</p>*/}
                            <Button
                                onClick={e => productItemFind(productFindState[index])}
                            >{item.name}</Button>
                        </div>
                    ))}
                </div>

                {/*PRODUCT_ITEM_EDIT*/}
                <div className="flex-1 w-[30%]">
                    <Title text={`${productNameState}`} size="md" className="font-bold"/>
                    <Title text={`Product Item Edit`} size="xs"/>
                    {productIdRef.current !== null && productItemFindState.map((item, index) => (
                        <div key={item.id} className="flex w-full max-w-sm items-center space-x-2 mb-1">
                            <div key={item.id} className="flex w-full max-w-sm items-center space-x-2 mb-1">
                                <p>{item.id}</p>
                                <Input type='text'
                                       defaultValue={item.name}
                                       onChange={e => eventHandler(productItemFindState[index], e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    disabled={productItemFindState[index].name === productItemFindState2[index].name}
                                    onClick={() => eventSubmitUpdate(productItemFindState2[index])}
                                >Up</Button>
                                <Button
                                    type="submit"
                                    onClick={() => eventSubmitDelete(item)}
                                >Del</Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/*PRODUCT_ITEM_CREATE*/}
                <div className="flex-1 w-[25%] ml-5">
                    <Title text={`${categoryNameState}`} size="md" className="font-bold"/>
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
