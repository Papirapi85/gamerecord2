'use client';

import { Api } from '@/services/api-client';
import { ICategory } from '@/services/categories';
import { cn } from '@/components/lib/utils';
import React from 'react';
import {Loader} from "lucide-react";


interface Props {
    className?: string;
}

export const CategoryMap: React.FC<Props> = ({ className }) => {

    const [categories, setCategories] = React.useState<ICategory []>([]);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        async function fetchStories() {
            const data = await Api.categories.getAll();
            setCategories(data);
        }
        fetchStories().then(r => setOpen(true));
    }, []);

    return (
        <div>
            {open ?
                <div className={cn('gap-1 bg-secondary p-1 rounded-2xl', className)}>
                    {categories.map((category) => (
                        <div key={category.id}>
                            {category.name}
                        </div>
                    ))}
                </div>
                :
                <div className={cn('justify-items-center')} ><Loader /></div>
            }
        </div>

    );
};
