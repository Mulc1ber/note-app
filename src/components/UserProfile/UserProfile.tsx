import { Avatar, Button, Tooltip } from "@mantine/core";
import styles from "./UserProfile.module.css";

interface UserProfileProps {
  userName: string;
  onClick: () => void;
  btnText: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userName,
  onClick,
  btnText,
}) => {
  return (
    <span className={styles["user-profile"]}>
      <Tooltip label={userName} color="gray">
        <Avatar size="sm" radius="xl" color="blue">
          {userName.slice(0, 1).toUpperCase()}
        </Avatar>
      </Tooltip>
      <Button
        variant="outline"
        color="gray"
        size="xs"
        radius="md"
        onClick={onClick}
      >
        {btnText}
      </Button>
    </span>
  );
};
