import { useCallback, useEffect, useMemo, useState } from "react";

export interface Player {
  name: string;
}

export interface Tournament {
  name: string;
  createdAt: Date;
  playerCount: number;
  courtCount: number;
  status: 'new' | 'ongoing' | 'completed'
  players: Player[]
}

export interface UseTournamentsResult {
  tournaments: Tournament[];
  addTournament: (t: Tournament) => void;
  removeTournament: (t: Tournament) => void;
  selectedTournament: Tournament | undefined;
  selectTournament: (t: Tournament | undefined) => void;
  startTournament: (t: Tournament) => void;
  completeTournament: (t: Tournament) => void;
}

export const useTournaments = (): UseTournamentsResult => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const addTournament = useCallback((t: Tournament) => {
    setTournaments(s => [...s, t]);
    setSelectedTournament({ ...t });
  }, []);

  const removeTournament = useCallback((t: Tournament) => {
    setTournaments(s => {
      const result = [...s];
      const index = result.findIndex((st) => st.name === t.name && st.createdAt === t.createdAt);
      result.splice(index, 1);
      return result;
    });
  }, []);

  const [selectedTournament, setSelectedTournament] = useState<Tournament | undefined>(undefined);
  const selectTournament = useCallback((t: Tournament | undefined) => {
    const tournament = tournaments.find((tt) => tt.name === t?.name && tt.createdAt === t.createdAt);
    setSelectedTournament(tournament && { ...tournament });
  }, [tournaments])

  useEffect(() => {
    if (!selectedTournament) {
      return;
    }
    if (tournaments.find((t) => t.name === selectedTournament.name && t.createdAt === selectedTournament.createdAt)) {
      return;
    }
    setSelectedTournament(undefined);
  }, [tournaments, selectedTournament])

  const startTournament = useCallback((t: Tournament) => {
    const tournament = tournaments.find((tt) => tt.name === t.name && tt.createdAt === t.createdAt);
    if (!tournament) {
      return;
    }
    setTournaments(s => {
      const result = [...s];
      const index = result.findIndex((st) => st.name === t.name && st.createdAt === t.createdAt);
      result[index].status = 'ongoing';
      return result;
    });
  }, [tournaments]);

  const completeTournament = useCallback((t: Tournament) => {
    const tournament = tournaments.find((tt) => tt.name === t.name && tt.createdAt === t.createdAt);
    if (!tournament) {
      return;
    }
    setTournaments(s => {
      const result = [...s];
      const index = result.findIndex((st) => st.name === t.name && st.createdAt === t.createdAt);
      result[index].status = 'completed';
      return result;
    });
  }, [tournaments]);

  return useMemo(() => ({
    tournaments,
    addTournament,
    removeTournament,
    selectedTournament,
    selectTournament,
    startTournament,
    completeTournament
  }), [addTournament, removeTournament, selectTournament, selectedTournament, startTournament, tournaments, completeTournament]);
};
