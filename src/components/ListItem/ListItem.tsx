import { NoteItem } from "../NoteItem/NoteItem";
import { useNotes } from "@/context";
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
