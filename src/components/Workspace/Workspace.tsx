import { useState, useEffect } from "react";
import { MarkdownRenderer } from "../MarkdownRenderer/MarkdownRenderer";
import { Button } from "@mantine/core";
import type { Note } from "@/types";
import styles from "./Workspace.module.css";

interface WorkspaceProps {
  note: Note | null;
  onDeleteNote: (id: string) => void;
  onUpdateNote: (id: string, content: string) => void;
}

export const Workspace = ({
  note,
  onDeleteNote,
  onUpdateNote,
}: WorkspaceProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    if (note) {
      setEditedContent(note.content);
      setIsEditing(false);
    }
  }, [note]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (note && editedContent !== note.content) {
      onUpdateNote(note.id, editedContent);
    }
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (note && confirm("Вы уверены, что хотите удалить эту заметку?")) {
      onDeleteNote(note.id);
    }
  };
  const handleCancelClick = () => {
    if (note) setEditedContent(note.content);
    setIsEditing(false);
  };

  if (!note) {
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
        <div className={styles["note-date"]}>{note.date}</div>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            autoFocus
          />
        ) : (
          <MarkdownRenderer content={note.content} />
        )}
      </div>
    </div>
  );
};
