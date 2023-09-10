import { Card, CardHeader, Caption1, Body1Stronger, Button, Badge, makeStyles } from "@fluentui/react-components";
import { Tournament } from "./use-tournaments"
import { DeleteRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    width: '100%',
  }
});

export type TournamentCardProps = Tournament & {
  onRemove?: () => void;
  onOpen?: () => void;
};

export const TournamentCard = (props: TournamentCardProps) => {
  const { name, createdAt, playerCount, courtCount, status, onRemove, onOpen } = props;
  const classes = useStyles();
  return (
    <Card onClick={onOpen} className={classes.root}>
      <CardHeader
        header={<Body1Stronger>{name}</Body1Stronger>}
        description={<Caption1>{createdAt.toLocaleDateString()}</Caption1>}
        action={onRemove && (
          <Button
            appearance="subtle"
            icon={<DeleteRegular />}
            onClick={onRemove}
          />
        )}
      />
      {playerCount} players on {courtCount} courts.
      <Badge color={status === 'completed' ? 'success' : status === 'ongoing' ? 'important' : 'informative'}>{status === 'completed' ? 'Completed' : status === 'ongoing' ? 'Ongoing' : 'New'}</Badge>
    </Card>
  );
};
