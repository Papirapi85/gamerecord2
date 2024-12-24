"use client";

import React, { useState } from "react";

const PasteImageUpload: React.FC = () => {
    const [preview, setPreview] = useState<string | null>(null); // Для изображения
    const [formData, setFormData] = useState<FormData | null>(null); // Для FormData объекта

    const handlePaste = (event: React.ClipboardEvent) => {
        const clipboardItems = event.clipboardData.items; // Получаем элементы из буфера обмена
        for (const item of clipboardItems) {
            if (item.type.startsWith("image/")) {
                const file = item.getAsFile(); // Извлекаем файл
                if (file) {
                    // Подготовка FormData
                    const form = new FormData();
                    form.append("screenshot", file, file.name || "screenshot.png");
                    setFormData(form);

                    // Устанавливаем превью изображения
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (typeof reader.result === "string") {
                            setPreview(reader.result); // Установка preview
                        }
                    };
                    reader.readAsDataURL(file); // Конвертируем изображение в Base64 для показа
                }
            }
        }
    };

    const handleUpload = async () => {
        if (!formData) {
            alert("Нет данных для загрузки!");
            return;
        }

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Изображение успешно загружено!");
            } else {
                alert("Ошибка загрузки изображения.");
            }
        } catch (error) {
            console.error("Ошибка загрузки:", error);
            alert("Ошибка загрузки.");
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
            {formData && <button onClick={handleUpload}>Загрузить изображение</button>}
        </div>
    );
};

export default PasteImageUpload;