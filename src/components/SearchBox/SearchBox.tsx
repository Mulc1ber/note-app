import { CloseButton, Input } from "@mantine/core";
import { useNotes } from "@/hooks";

export const SearchBox = () => {
  const { searchQuery, handleSearchChange } = useNotes();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleSearchChange(event.target.value);

  const handleClear = () => handleSearchChange("");

  return (
    <div>
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
