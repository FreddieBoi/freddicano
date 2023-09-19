import { LargeTitle, Subtitle1, makeStyles, makeStaticStyles, shorthands, tokens } from "@fluentui/react-components";
import { useTournaments } from "./use-tournaments";
import { TournamentList } from "./tournament-list";
import { useState } from "react";
import { TournamentForm } from "./tournament-form";
import { TournamentSummary } from "./tournament-summary";

const useStaticStyles = makeStaticStyles({
  body: {
    padding: 0,
    margin: 0,
  }
});

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    ...shorthands.overflow('hidden', 'auto'),
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingVerticalXXL),
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
});

export const App = () => {
  useStaticStyles();
  const classes = useStyles();
  const [formOpen, setFormOpen] = useState(false);
  const {
    tournaments,
    addTournament,
    removeTournament,
    updateTournament,
    selectedTournament,
    selectTournament,
    startTournament,
    completeTournament
  } = useTournaments();
  return (
    <div className={classes.root}>
      <div className={classes.main}>
        {formOpen && (
          <TournamentForm
            onBack={() => { setFormOpen(false); }}
            onSubmit={(t) => {
              if (t.id === selectedTournament?.id) {
                updateTournament(t);
              } else {
                addTournament(t);
                selectTournament(t.id);
              }
              setFormOpen(false);
            }}
            {...selectedTournament}
          />
        )}
        {!formOpen && selectedTournament && (
          <TournamentSummary
            onBack={() => { selectTournament(undefined); }}
            onEdit={() => { setFormOpen(true); }}
            onStart={() => { startTournament(selectedTournament.id); }}
            onComplete={() => { completeTournament(selectedTournament.id); }}
            {...selectedTournament}
          />
        )}
        {!formOpen && !selectedTournament && (
          <>
            <div className={classes.section}>
              <LargeTitle block>Freddicano</LargeTitle>
              <Subtitle1 block>An app for Americano padel.</Subtitle1>
            </div>
            <div className={classes.section}>
              <TournamentList
                tournaments={tournaments}
                onAdd={() => { setFormOpen(true); }}
                onRemove={removeTournament}
                onOpen={selectTournament}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
