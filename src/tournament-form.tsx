import { Button, Field, Input, SpinButton, Title1, Title2, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Player, Tournament } from "./use-tournaments"
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { ArrowLeftRegular, EditRegular, AddRegular } from '@fluentui/react-icons';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM)
  }
});

export type TournamentFormProps = Partial<Tournament> & {
  onSubmit: (t: Tournament) => void;
  onBack: () => void;
};

export const TournamentForm = (props: TournamentFormProps) => {
  const { id, status, createdAt, onSubmit, onBack } = props;

  const [name, setName] = useState(props.name ?? '');
  const [courtCount, setCourtCount] = useState(props.courtCount ?? 1);

  const [playerCount, setPlayerCount] = useState(props.playerCount ?? 4);
  const [players, setPlayers] = useState<Player[]>(props.players ?? [])

  const handleOnSubmit = useCallback(() => {
    const tournament: Tournament = {
      id: id ?? uuidv4(),
      createdAt: createdAt ?? new Date(),
      status: status ?? 'new',
      name,
      courtCount,
      playerCount,
      players,
    };
    onSubmit(tournament);
  }, [id, name, courtCount, playerCount, createdAt, players, status, onSubmit]);

  useLayoutEffect(() => {
    setPlayerCount(courtCount * 4);
  }, [courtCount]);

  useLayoutEffect(() => {
    setPlayers(s => {
      const result = [...s].splice(0, playerCount);
      while (result.length < playerCount) {
        result.push({ name: '' })
      }
      return result;
    });
  }, [playerCount]);

  const invalid = useMemo(() => !name || !courtCount || playerCount < courtCount * 4 || players.some(p => !p.name), [courtCount, name, playerCount, players]);

  const title = createdAt ? 'Update tournament' : 'Add tournament';
  const classes = useStyles();
  return (
    <form onSubmit={handleOnSubmit} className={classes.root}>
      <Title1>{title}</Title1>
      <Field label="Name" required validationState={!name ? 'warning' : undefined} validationMessage={!name ? 'Enter tournament name' : undefined}>
        <Input name="name" value={name} onChange={(_e, data) => { setName(data.value); }} autoFocus />
      </Field>
      <Field label="Number of courts" required>
        <SpinButton
          name="courtCount"
          value={courtCount}
          onChange={(_e, data) => {
            setCourtCount(data.value ?? 0);
          }}
        />
      </Field>
      <Title2>Players</Title2>
      <Field label="Number of players" required validationState={playerCount < courtCount * 4 ? 'error' : undefined} validationMessage={playerCount < courtCount * 4 ? `You need at least ${courtCount * 4} players` : undefined}>
        <SpinButton name="playerCount" value={playerCount} onChange={(_e, data) => { setPlayerCount(data.value ?? 0); }} />
      </Field>
      {players.map((p, i) => (
        <Field key={i} label={`Player ${i + 1}`} required validationState={!p.name ? 'warning' : undefined} validationMessage={!p.name ? 'Enter player name' : undefined}>
          <Input name="name" value={p.name} onChange={(_e, data) => {
            setPlayers((s) => {
              const result = [...s];
              result[i].name = data.value;
              return result;
            });
          }} />
        </Field>
      ))
      }
      <Button
        type="submit"
        appearance="secondary"
        icon={<ArrowLeftRegular />}
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        {createdAt ? 'Back to tournament' : 'Back to tournament list'}
      </Button>
      <Button
        type="submit"
        appearance="primary"
        disabled={invalid}
        icon={createdAt ? <EditRegular /> : <AddRegular />}
      >
        {title}
      </Button>
    </form >
  );
};
