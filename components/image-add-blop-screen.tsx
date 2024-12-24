"use client";

import React, { useState } from "react";

interface ImageAddBlobScreenProps {
    onFormDataReady: (formData: FormData) => void; // Функция передачи FormData
}

const ImageAddBlobScreen: React.FC<ImageAddBlobScreenProps> = ({ onFormDataReady }) => {
    const [preview, setPreview] = useState<string | null>(null); // Для превью изображения

    const handlePaste = (event: React.ClipboardEvent) => {
        const clipboardItems = event.clipboardData.items; // Получаем элементы буфера обмена
        for (const item of clipboardItems) {
            if (item.type.startsWith("image/")) {
                const file = item.getAsFile(); // Извлекаем файл
                if (file) {
                    // Готовим FormData
                    const form = new FormData();
                    form.append('image', file, file.name || "screenshot.png");
                    // Передаём готовый FormData через callback
                    onFormDataReady(form);

                    // Устанавливаем превью
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (typeof reader.result === "string") {
                            setPreview(reader.result); // Отображает превью
                        }
                    };
                    reader.readAsDataURL(file);
                }
            }
        }
    };

    return (
        <div
            onPaste={handlePaste}
            style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
            }}
        >
            <h2>Вставьте изображение с помощью Ctrl+V</h2>
            {preview && (
                <div>
                    <h3>Предпросмотр:</h3>
                    <img src={preview} alt="Preview" style={{ maxWidth: "100%" }} />
                </div>
            )}
        </div>
    );
};

export default ImageAddBlobScreen;