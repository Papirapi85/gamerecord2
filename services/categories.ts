import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { Category } from '@prisma/client';

export type ICategory = Category;

export const getAll = async (): Promise<Category[]> => {
  return (
      await axiosInstance.get<ICategory[]>(ApiRoutes.CATEGORIES)
  ).data;
};