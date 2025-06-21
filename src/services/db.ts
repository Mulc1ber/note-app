import type { Note } from "@/types";
import { Dexie } from "dexie";

class NotesDatabase extends Dexie {
  public notes!: Dexie.Table<Note, string>;

  constructor() {
    super("NotesDatabase");

    this.version(1).stores({
      notes: "id, title, content, date", // Индексируемые поля
    });
  }
}

export const db = new NotesDatabase();
