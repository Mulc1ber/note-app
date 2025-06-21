import { CloseButton, Input } from "@mantine/core";
import styles from "./SearchBox.module.css";
import { useNotes } from "@/context";

export const SearchBox = () => {
  const { searchQuery, handleSearchChange } = useNotes();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleSearchChange(event.target.value);

  const handleClear = () => handleSearchChange("");

  return (
    <div className={styles["search-bar"]}>
      <Input
        type="text"
        placeholder="Поиск..."
        value={searchQuery}
        onChange={handleChange}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={handleClear}
            style={{ display: searchQuery ? undefined : "none" }}
          />
        }
      />
    </div>
  );
};
