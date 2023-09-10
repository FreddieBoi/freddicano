import { Button, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Tournament } from "./use-tournaments"
import { EditRegular, ArrowLeftRegular, PlayRegular } from "@fluentui/react-icons";
import { TournamentCard } from "./tournament-card";
import { PlayerCard } from "./player-card";

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingHorizontalM)
  },
  players: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingHorizontalS)
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingHorizontalS)
  }
});

export type TournamentSummaryProps = Tournament & {
  onStart: () => void;
  onEdit: () => void;
  onBack: () => void;
};

export const TournamentSummary = (props: TournamentSummaryProps) => {
  const { players, status, onStart, onEdit, onBack } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TournamentCard {...props} />
      <div className={classes.players}>
        {players.map((p, i) => (
          <PlayerCard key={i} {...p} />
        ))}
      </div>
      <div className={classes.buttons}>
        <Button
          type="submit"
          appearance="secondary"
          onClick={onBack}
          icon={<ArrowLeftRegular />}
        >
          Back to tournament list
        </Button>
        <Button
          type="submit"
          appearance="secondary"
          onClick={onEdit}
          disabled={status !== 'new'}
          icon={<EditRegular />}
        >
          Update tournament
        </Button>
        <Button
          appearance="primary"
          disabled={status !== 'new'} onClick={onStart}
          icon={<PlayRegular />}
        >
          Start tournament
        </Button>
      </div>
    </div >
  );
};
