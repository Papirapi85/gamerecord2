'use client';
import React, {useEffect} from 'react';
import {Category, Product, ProductItem, User} from '@prisma/client';
import toast from 'react-hot-toast';
import {Container} from './container';
import {Title} from './title';
import {Button, Input} from '@/components/ui';
import {addRecordActions, productItemCreate} from '@/app/actions';




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

    const [timestatState, setTimestatState] = React.useState('');
    const [imgState, setImgState] = React.useState('');
    const [videoState, setVideoState] = React.useState('');

    //const [productState, setProductState] = React.useState<Product[]>(product);
    const [productFindState, setProductFindState] = React.useState<Product[]>([]);

    const [productItemState, setProductItemState] = React.useState<ProductItem[]>([]);
    // const [productItemFindState, setProductItemFindState] = React.useState<ProductItem[]>([]);
    // const [productItemFindState2, setProductItemFindState2] = React.useState<ProductItem[]>([]);

    const [createState, setCreateState] = React.useState("");

    const categoryIdRef = React.useRef(0);
    const productIdRef = React.useRef(0);
    const productItemIdRef = React.useRef(0);
    const addRecordViewRef = React.useRef(false);

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

    const addRecordFB = async () => {
        try {
            await addRecordActions({
                userId: user.id,
                categoryId: categoryIdRef.current,
                productId: productIdRef.current,
                productItemId: productItemIdRef.current,
                timestate: timestatState,
                video: videoState,
                img: imgState,
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

            {/*CATEGORY_LIST*/}
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
                    {categoryIdRef.current !== 0 && productFindState.map((item, index) => (
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
                    {productIdRef.current !== 0 && productItemState.map((item, index) => (
                        <div key={index} className="flex w-full max-w-sm items-center space-x-2 mb-1">
                                {/*<p>{item.id}</p>*/}
                                <Button
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
                <div className="flex-1 w-[25%] ml-5">
                    <Title text={`${categoryNameState}`} size="md" className="font-bold"/>
                    <Title text={`${productNameState}`} size="md" className="font-bold"/>
                    <Title text={`${productItemNameState}`} size="md" className="font-bold"/>
                    {(productItemIdRef.current !== 0 && addRecordViewRef.current === true) &&
                        <div>
                            <div className="m-2">
                                <Input
                                    name="timestate"
                                    type="time"
                                    step="0.001"
                                    pattern="[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}"
                                    defaultValue="00:00"
                                    onChange={e => {
                                        setTimestatState(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="m-2">
                                <Input type='text'
                                       placeholder="IMAGE"
                                       onChange={e => {
                                           setImgState(e.target.value)
                                       }}
                                />
                            </div>
                            <div className="m-2">
                                <Input type='text'
                                       placeholder="VIDEO"
                                       onChange={e => {
                                           setVideoState(e.target.value)
                                       }}
                                />
                            </div>
                            <div className="m-2">
                                <Button
                                    disabled={timestatState === "" || imgState === "" || videoState === ""}
                                    onClick={addRecordFB}
                                >Add Record</Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Container>
    );
};
