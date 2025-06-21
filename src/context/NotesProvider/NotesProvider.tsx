import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { generateId, getInitialNotes } from "@/utils";
import type { Note } from "@/types";

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
  const [notes, setNotes] = useState<Note[]>(getInitialNotes());
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = useMemo(() => {
    if (!searchQuery) {
      return notes;
    }
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

  const addNote = () => {
    const newNote: Note = {
      id: generateId(),
      title: "Новая заметка",
      content: "",
      date: new Date().toLocaleString("ru-RU"),
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null); // Deselect if the deleted note was selected
    }
  };

  const updateNote = (id: string, updatedContent: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              content: updatedContent,
              title: updatedContent.split("\n")[0] || "Новая заметка",
              date: updatedContent
                ? new Date().toLocaleString("ru-RU")
                : note.date,
            }
          : note
      )
    );
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
