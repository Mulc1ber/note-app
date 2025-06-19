import type { Note } from "@/types";
import { ListItem } from "../ListItem/ListItem";
import { SearchBox } from "../SearchBox/SearchBox";
import { Button } from "@mantine/core";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onAddNote: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const Sidebar = ({
  notes,
  selectedNoteId,
  onSelectNote,
  onAddNote,
  ...rest
}: SidebarProps) => {
  return (
    <div className={styles["sidebar"]}>
      <SearchBox {...rest} />
      <ListItem
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={onSelectNote}
      />
      <div className={styles["add-note-button-container"]}>
        <Button
          className={styles["add-note-button"]}
          variant="filled"
          size="md"
          radius="sm"
          onClick={onAddNote}
        >
          + Новая заметка
        </Button>
      </div>
    </div>
  );
};
