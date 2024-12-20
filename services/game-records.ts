import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { GameRecords } from '@prisma/client';

export type IGameRecords = GameRecords;

export const getAll = async (): Promise<GameRecords[]> => {
  return (
      await axiosInstance.get<IGameRecords[]>(ApiRoutes.GAMERECORDS)
  ).data;
};