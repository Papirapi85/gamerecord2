'use client';
import React, {useEffect, useState} from 'react';
import {Category, Product, ProductItem, User} from '@prisma/client';
import toast from 'react-hot-toast';
import {Container} from './container';
import {Title} from './title';
import {Button, Input} from '@/components/ui';
import {categoryUpdate, categoryCreate, categoryDelete, productCreate, productItemCreate} from '@/app/actions';
import {useOpenInEditor} from "next/dist/client/components/react-dev-overlay/internal/helpers/use-open-in-editor";

interface Props {
    category: Category[];
    product: Product[];
    productItem: ProductItem[];
}

export const AddGame: React.FC<Props> = ({category, product, productItem}) => {

    const [categoryInputNameState, setCategoryInputNameState] = React.useState('');
    const [categoryNameFindProductsState, setCategoryNameFindProductsState] = React.useState('');

    
    const [productNameState, setProductNameState] = React.useState('');
    const [createProductNameState, setCreateProductNameState] = React.useState("");
    const [productItemInputNameState, setProductItemInputNameState] = React.useState("");

    const [categoryFindProductArrayState, setCategoryFindProductArrayState] = React.useState<Product[]>([]);
    const [productFindProductItemArrayState, setProductFindProductItemArrayState] = React.useState<ProductItem[]>([]);

    const categoryIdRef = React.useRef(0);
    const productIdRef = React.useRef(0);


    useEffect(() => {
        productFind();
    }, [product]);

    useEffect(() => {
        productItemFind();
    }, [productItem]);
    
    const CreateCategory = async () => {
        try {
            if (categoryInputNameState === '') {
                return toast.error('Ошибка при создании данных, пустое поле', {
                    icon: '❌',
                });
            }

            await categoryCreate({
                name: categoryInputNameState,
            });

            setCategoryInputNameState('');

            toast.error('Данные созданы 📝', {
                icon: '✅',
            });

        } catch (error) {
            return toast.error('Ошибка при создании данных', {
                icon: '❌',
            });
        }
    }
    const CreateProduct = async () => {
        try {
            if(createProductNameState === '') {
                return toast.error('Error create data, filed empty', {
                    icon: '❌',
                });
            }
            await productCreate({
                name: createProductNameState,
                categoryId: categoryIdRef.current,
            });
            setCreateProductNameState('');
            toast.error('Data create 📝', {
                icon: '✅',
            });
        } catch (error) {
            return toast.error('Error create data', {
                icon: '❌',
            });
        }
    }
    const CreateProductItem = async () => {
        try {
            if(productItemInputNameState === '') {
                return toast.error('Error create data, filed empty', {
                    icon: '❌',
                });
            }
            await productItemCreate({
                name: productItemInputNameState,
                productId: productIdRef.current,
            });
            setProductItemInputNameState('')
            toast.error('Data create 📝', {
                icon: '✅',
            });
        } catch (error) {
            return toast.error('Error create data', {
                icon: '❌',
            });
        }
    }

    const productFind = () => {
        let array = []
        for (let i = 0; i < product.length; i++) {
            if (product[i].categoryId === categoryIdRef.current) {
                array.push(product[i]);
            }
        }
        setCategoryFindProductArrayState(array);
    }
    const productItemFind = () => {
        let array = []
        for (let i = 0; i < productItem.length; i++) {
            if (productItem[i].productId === productIdRef.current) {
                array.push(productItem[i]);
            }
        }
        setProductFindProductItemArrayState(array);
    }

    return (
        <Container className="my-4">
            <div className="flex gap-4">
                <div className="w-[33%] text-ellipsis overflow-hidden whitespace-nowrap">
                    <Title text={`Category Add`} size="xs" className="font-bold"/>
                    <div className="flex w-full max-w-sm items-center space-x-2 mb-1">
                        <Input className="m-2 h-5" type='text'
                               value={categoryInputNameState}
                               onChange={e => {
                                   setCategoryInputNameState(e.target.value)
                               }
                               }/>
                        <Button
                            type="submit"
                            disabled={categoryInputNameState === ''}
                            onClick={CreateCategory}
                        >Add</Button>
                    </div>

                    {category.map((item, index) => (
                        <div key={item.id} className="flex w-full max-w-sm items-center space-x-2 mb-1">
                            <Button className="p-1 h-5" onClick={() => {categoryIdRef.current = item.id; setCategoryNameFindProductsState(item.name); productFind()}}
                                >{item.name}</Button>
                        </div>
                    ))}
                </div>
                {/*PRODUCT_CREATE*/}
                <div className="w-[33%] text-ellipsis overflow-hidden whitespace-nowrap">
                    <Title text={categoryNameFindProductsState} size="xs"/>
                    {categoryIdRef.current !== 0 &&
                        <div className="flex w-full max-w-sm items-center space-x-2 mb-1">
                            <Input className="m-2 h-5" type='text'
                                   value={createProductNameState}
                                   onChange={e => {
                                       setCreateProductNameState(e.target.value)
                                   }}
                            />
                            <Button
                                type="submit"
                                disabled={createProductNameState === ''}
                                onClick={CreateProduct}
                            >Add</Button>
                        </div>
                    }
                    {/*PRODUCT_LIST*/}
                    {categoryIdRef.current !== 0 && categoryFindProductArrayState.map((item, index) => (
                        <div key={index}>
                            <Button className="p-1 h-5"
                                    onClick={e => {
                                        productIdRef.current = categoryFindProductArrayState[index].id
                                        setProductNameState(categoryFindProductArrayState[index].name);
                                        productItemFind()
                                    }
                            }>{item.name}</Button>
                        </div>
                    ))}
                </div>

                {/*PRODUCT_ITEM_CREATE*/}
                <div className="w-[33%] text-ellipsis overflow-hidden whitespace-nowrap">
                    <Title text={productNameState} size="xs" />
                        {productIdRef.current !== 0 &&
                            <div className="flex w-full max-w-sm items-center space-x-2 p-1">
                                <Input type='text' className="m-2 h-5"
                                       value={productItemInputNameState}
                                       onChange={e => {setProductItemInputNameState(e.target.value)}}
                                />
                                <Button
                                    type="submit"
                                    disabled={productItemInputNameState === ''}
                                    onClick={CreateProductItem}
                                >Add</Button>
                            </div>
                        }
                    {/*PRODUCT_ITEM_LIST*/}
                    <div className="mb-2">
                        {productIdRef.current !== 0 && productFindProductItemArrayState.map((item, index) => (
                            <div key={index} className="h-4">
                                {/*<p>{item.id}</p>*/}
                                <Title text={item.name} size="xs" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};
