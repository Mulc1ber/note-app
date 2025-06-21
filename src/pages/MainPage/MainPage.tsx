import { Sidebar, Workspace } from "@/components";
import { NotesProvider } from "@/context";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  return (
    <>
      <NotesProvider>
        <div className={styles["main-container"]}>
          <Sidebar />
          <Workspace />
        </div>
      </NotesProvider>
    </>
  );
};
