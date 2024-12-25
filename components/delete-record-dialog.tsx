import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"; // Импорт вашего компонента Dialog
import { Button } from "@/components/ui/button";
import {deleteRecordActions} from "@/app/actions"; // Ваш компонент кнопки

export const DeleteRecordDialog = ({ id }: { id: number }) => {
    const [open, setOpen] = useState(false); // Управление состоянием диалога

    const handleDelete = async () => {
        try {
            await deleteRecordActions({ id }); // Выполнение логики удаления записи
            setOpen(false); // Закрытие диалога после успешного удаления
        } catch (error) {
            console.error("Error deleting record:", error); // Обработка ошибок
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-[60px] h-[20px]">Delete</Button>
            </DialogTrigger>
            <DialogContent className="bg-secondary">
                {/* Добавляем компонент DialogTitle */}
                <DialogTitle>Confirm Deletion</DialogTitle>

                <p>Are you sure you want to delete this record?</p>

                <div className="flex justify-end space-x-2">
                    {/* Кнопка для подтверждения удаления */}
                    <Button onClick={handleDelete} className="bg-red-500 text-white">
                        Confirm Delete
                    </Button>
                    {/* Кнопка для отмены */}
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};