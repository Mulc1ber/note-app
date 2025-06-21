import type { Note } from "@/types";
import { useNotes } from "@/hooks";
import styles from "./NoteItem.module.css";

interface NoteItemProps {
  note: Note;
}

export const NoteItem = ({ note }: NoteItemProps) => {
  const { selectedNoteId, setSelectedNoteId } = useNotes();

  return (
    <div
      className={`${styles["note-list-item"]} ${
        note.id === selectedNoteId ? styles.selected : ""
      }`}
      onClick={() => setSelectedNoteId(note.id)}
    >
      <h4>{note.title || "Без названия"}</h4>
      <div className={styles["note-preview-container"]}>
        <span>{note.date}</span>
        <p>{note.content.split("\n")[0] || "Нет содержимого"}</p>
      </div>
    </div>
  );
};
