import { useCallback, useMemo, useState } from "react";

export interface Player {
  name: string;
}

export type TournamentStatus = 'new' | 'ongoing' | 'completed';

export interface Tournament {
  id: string;
  name: string;
  createdAt: Date;
  playerCount: number;
  courtCount: number;
  status: TournamentStatus;
  players: Player[]
}

export interface UseTournamentsResult {
  tournaments: Tournament[];
  addTournament: (tournament: Tournament) => void;
  removeTournament: (tournamentId: string) => void;
  selectedTournament: Tournament | undefined;
  selectTournament: (tournamentId: string | undefined) => void;
  startTournament: (tournamentId: string) => void;
  completeTournament: (tournamentId: string) => void;
}

export const useTournaments = (): UseTournamentsResult => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const addTournament = useCallback((t: Tournament) => {
    setTournaments(s => [...s, t]);
    setSelectedTournamentId(t.id);
  }, []);

  const removeTournament = useCallback((tournamentId: string) => {
    setTournaments(prevTournaments => {
      const index = prevTournaments.findIndex((t) => t.id === tournamentId);
      if (index < 0) {
        return prevTournaments;
      }
      const newTournaments = [...prevTournaments];
      newTournaments.splice(index, 1);
      return newTournaments;
    });
  }, []);

  const [selectedTournamentId, setSelectedTournamentId] = useState<string | undefined>(undefined);
  const selectedTournament = useMemo(() => tournaments.find((t) => t.id === selectedTournamentId), [selectedTournamentId, tournaments]);

  const startTournament = useCallback((tournamentId: string) => {
    setTournaments(prevTournaments => {
      const index = prevTournaments.findIndex((t) => t.id === tournamentId);
      if (index < 0) {
        return prevTournaments;
      }
      const newTournaments = [...prevTournaments];
      newTournaments[index] = {
        ...newTournaments[index],
        status: 'ongoing'
      };
      return newTournaments;
    });
  }, []);

  const completeTournament = useCallback((tournamentId: string) => {
    setTournaments(prevTournaments => {
      const index = prevTournaments.findIndex((t) => t.id === tournamentId);
      if (index < 0) {
        return prevTournaments;
      }
      const newTournaments = [...prevTournaments];
      newTournaments[index] = {
        ...newTournaments[index],
        status: 'completed'
      };
      return newTournaments;
    });
  }, []);

  return useMemo(() => ({
    tournaments,
    addTournament,
    removeTournament,
    selectedTournament,
    selectTournament: setSelectedTournamentId,
    startTournament,
    completeTournament
  }), [addTournament, removeTournament, selectedTournament, startTournament, tournaments, completeTournament]);
};
