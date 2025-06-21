import { useState, useEffect } from "react";
import { MarkdownRenderer } from "../MarkdownRenderer/MarkdownRenderer";
import { Button } from "@mantine/core";
import { useNotes } from "@/context";
import styles from "./Workspace.module.css";

export const Workspace = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const { selectedNote, deleteNote, updateNote } = useNotes();

  useEffect(() => {
    if (selectedNote) {
      setEditedContent(selectedNote.content);
      setIsEditing(false);
    }
  }, [selectedNote]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (selectedNote && editedContent !== selectedNote.content) {
      updateNote(selectedNote.id, editedContent);
    }
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (
      selectedNote &&
      confirm("Вы уверены, что хотите удалить эту заметку?")
    ) {
      deleteNote(selectedNote.id);
    }
  };
  const handleCancelClick = () => {
    if (selectedNote) setEditedContent(selectedNote.content);
    setIsEditing(false);
  };

  if (!selectedNote) {
    return (
      <div
        className={`${styles["main-content"]} ${styles["no-note-selected"]}`}
      >
        Выберите заметку слева или создайте новую.
      </div>
    );
  }

  return (
    <div className={`${styles["main-content"]} ${styles["note-view"]}`}>
      <div className={styles["note-header"]}>
        {isEditing ? (
          <>
            <Button variant="light" color="teal" onClick={handleSaveClick}>
              Сохранить
            </Button>
            <Button variant="light" color="gray" onClick={handleCancelClick}>
              Отмена
            </Button>
          </>
        ) : (
          <>
            <Button variant="light" onClick={handleEditClick}>
              Редактировать
            </Button>
            <Button variant="light" color="red" onClick={handleDeleteClick}>
              Удалить
            </Button>
          </>
        )}
      </div>
      <div
        className={`${styles["note-content"]} ${
          isEditing ? styles.editing : ""
        }`}
      >
        <div className={styles["note-date"]}>{selectedNote.date}</div>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            autoFocus
          />
        ) : (
          <MarkdownRenderer content={selectedNote.content} />
        )}
      </div>
    </div>
  );
};
