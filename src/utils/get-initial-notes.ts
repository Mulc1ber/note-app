import { generateId } from "./generate-id";
import type { Note } from "@/types";

export const getInitialNotes = (): Note[] => {
  const savedNotes = localStorage.getItem("notes");
  return savedNotes
    ? (JSON.parse(savedNotes) as Note[])
    : [
        {
          id: generateId(),
          title: "Привет!",
          content:
            'Это первая заметка.\n\n**Напиши что-нибудь еще!**\n\n```javascript\nconsole.log("Hello, world!");\n```',
          date: new Date().toLocaleString("ru-RU"),
        },
        {
          id: generateId(),
          title: "Список покупок",
          content: "- Молоко\n- Хлеб\n- Яблоки",
          date: new Date().toLocaleString("ru-RU"),
        },
        {
          id: generateId(),
          title: "Идея проекта",
          content: "Создать крутое веб-приложение.",
          date: new Date().toLocaleString("ru-RU"),
        },
      ];
};
