import { CloseButton, Input } from "@mantine/core";
import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const SearchBox = ({ searchQuery, onSearchChange }: SearchBoxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onSearchChange(event.target.value);

  const handleClear = () => onSearchChange("");

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
