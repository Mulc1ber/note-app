import { useNotes } from "@/hooks";
import { NoteItem } from "../NoteItem/NoteItem";
import styles from "./ListItem.module.css";

export const ListItem = () => {
  const { filteredNotes } = useNotes();

  return (
    <div className={styles["note-list"]}>
      {filteredNotes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};
