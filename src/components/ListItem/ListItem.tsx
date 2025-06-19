import type { Note } from "@/types";
import { NoteItem } from "../NoteItem/NoteItem";
import styles from "./ListItem.module.css";

interface ListItemProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
}

export const ListItem = ({ notes, ...rest }: ListItemProps) => {
  return (
    <div className={styles["note-list"]}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} {...rest} />
      ))}
    </div>
  );
};
