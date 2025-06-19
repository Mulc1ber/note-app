import type { Note } from "@/types";
import styles from "./NoteItem.module.css";

interface NoteItemProps {
  note: Note;
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
}

export const NoteItem = ({
  note,
  selectedNoteId,
  onSelectNote,
}: NoteItemProps) => {
  return (
    <div
      className={`${styles["note-list-item"]} ${
        note.id === selectedNoteId ? styles.selected : ""
      }`}
      onClick={() => onSelectNote(note.id)}
    >
      <h4>{note.title || "Без названия"}</h4>
      <div className={styles["note-preview-container"]}>
        <span>{note.date}</span>
        <p>{note.content.split("\n")[0] || "Нет содержимого"}</p>
      </div>
    </div>
  );
};
