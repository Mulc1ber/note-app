import { AuthStatus } from "../AuthStatus/AuthStatus";
import { ListItem } from "../ListItem/ListItem";
import { SearchBox } from "../SearchBox/SearchBox";
import { Button } from "@mantine/core";
import { useNotes } from "@/hooks";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const { addNote } = useNotes();

  return (
    <div className={styles["sidebar"]}>
      <div className={styles["sidebar-header"]}>
        <AuthStatus />
        <SearchBox />
      </div>
      <ListItem />
      <div className={styles["add-note-button-container"]}>
        <Button
          className={styles["add-note-button"]}
          variant="filled"
          size="md"
          radius="sm"
          onClick={addNote}
        >
          + Новая заметка
        </Button>
      </div>
    </div>
  );
};
