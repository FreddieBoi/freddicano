import { Button, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Tournament } from "./use-tournaments";
import { AddRegular } from "@fluentui/react-icons";
import { TournamentCard } from "./tournament-card";


const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM)
  }
});

export interface TournamentListProps {
  tournaments: Tournament[];
  onAdd: () => void;
  onRemove: (t: Tournament) => void;
  onOpen: (t: Tournament) => void;
}

export const TournamentList = (props: TournamentListProps) => {
  const { tournaments, onAdd, onOpen, onRemove } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        appearance="primary"
        icon={<AddRegular />}
        onClick={onAdd}
      >
        Add tournament
      </Button>
      {
        tournaments.map((t, i) => (
          <TournamentCard key={i} {...t} onRemove={() => { onRemove(t); }} onOpen={() => { onOpen(t); }} />
        ))
      }
    </div>
  )
}