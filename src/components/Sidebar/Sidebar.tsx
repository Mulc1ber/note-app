import type { Note } from "@/types";
import { ListItem } from "../ListItem/ListItem";
import { SearchBox } from "../SearchBox/SearchBox";
import { Button } from "@mantine/core";

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
    <div className="sidebar">
      <SearchBox {...rest} />
      <ListItem
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={onSelectNote}
      />
      <div className="add-note-button-container">
        <Button
          className="add-note-button"
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
