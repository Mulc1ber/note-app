import { createContext, useMemo, useState, type ReactNode } from "react";
import { generateId } from "@/utils";
import type { Note } from "@/types";
import { db } from "@/services";
import { useLiveQuery } from "dexie-react-hooks";

interface NotesContextType {
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string | null) => void;
  searchQuery: string;
  filteredNotes: Note[];
  selectedNote: Note | null;
  addNote: () => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, content: string) => void;
  handleSearchChange: (query: string) => void;
}

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesContext = createContext<NotesContextType | null>(null);

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const rawNotes = useLiveQuery(() =>
    db.notes.orderBy("date").reverse().toArray()
  );
  const notes = useMemo(() => rawNotes || [], [rawNotes]);

  const filteredNotes = useMemo(() => {
    if (!searchQuery) return notes;
    const lowerQuery = searchQuery.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.content.toLowerCase().includes(lowerQuery)
    );
  }, [notes, searchQuery]);

  const selectedNote = useMemo(() => {
    return notes.find((note) => note.id === selectedNoteId) || null;
  }, [notes, selectedNoteId]);

  const addNote = async () => {
    const newNote: Note = {
      id: generateId(),
      title: "Новая заметка",
      content: "",
      date: new Date().toLocaleString("ru-RU"),
    };
    await db.notes.add(newNote); // Сохраняем в IndexedDB
    setSelectedNoteId(newNote.id);
  };

  const deleteNote = async (id: string) => {
    await db.notes.delete(id); // Удаляем из IndexedDB
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  };

  const updateNote = async (id: string, updatedContent: string) => {
    await db.notes.update(id, {
      content: updatedContent,
      title: updatedContent.split("\n")[0] || "Новая заметка",
      date: updatedContent ? new Date().toLocaleString("ru-RU") : undefined,
    });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const value: NotesContextType = {
    selectedNoteId,
    setSelectedNoteId,
    searchQuery,
    filteredNotes,
    selectedNote,
    addNote,
    deleteNote,
    updateNote,
    handleSearchChange,
  };
  return <NotesContext value={value}>{children}</NotesContext>;
};
