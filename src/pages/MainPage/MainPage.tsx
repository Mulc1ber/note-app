import { useState, useEffect, useMemo } from "react";
import { generateId, getInitialNotes } from "@/utils";
import { Sidebar, Workspace } from "@/components";
import type { Note } from "@/types";
import styles from "./MainPage.module.css";

export const MainPage = () => {
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

  return (
    <div className={styles["main-container"]}>
      <Sidebar
        notes={filteredNotes}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
        onAddNote={addNote}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <Workspace
        note={selectedNote}
        onDeleteNote={deleteNote}
        onUpdateNote={updateNote}
      />
    </div>
  );
};
