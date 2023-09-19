import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export interface Player {
  name: string;
}

export type TournamentStatus = 'new' | 'ongoing' | 'completed';

export interface Tournament {
  id: string;
  name: string;
  createdAt: string;
  playerCount: number;
  courtCount: number;
  status: TournamentStatus;
  players: Player[]
}

export interface UseTournamentsResult {
  tournaments: Tournament[];
  addTournament: (tournament: Tournament) => void;
  removeTournament: (tournamentId: string) => void;
  updateTournament: (tournament: Tournament) => void;
  selectedTournament: Tournament | undefined;
  selectTournament: (tournamentId: string | undefined) => void;
  startTournament: (tournamentId: string) => void;
  completeTournament: (tournamentId: string) => void;
}

export const useTournaments = (): UseTournamentsResult => {
  const [savedTournaments, setSavedTournaments] = useLocalStorage('tournaments', '[]');

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  useEffect(() => {
    const newTournaments = JSON.parse(savedTournaments) as Tournament[];
    setTournaments((prevTournaments) => {
      const prevTournamentIds = prevTournaments.map(t => t.id);
      if (newTournaments.every(t => prevTournamentIds.includes(t.id))) {
        return prevTournaments;
      }
      console.log('Loading', newTournaments, savedTournaments);
      return newTournaments;
    });
  }, [savedTournaments]);
  useEffect(() => {
    const newSavedTournaments = JSON.stringify(tournaments);
    console.log('Saving', tournaments, newSavedTournaments);
    setSavedTournaments(newSavedTournaments);
  }, [setSavedTournaments, tournaments]);

  const addTournament = useCallback((tournament: Tournament) => {
    setTournaments((prevTournaments) => {
      const index = prevTournaments.findIndex((t) => t.id === tournament.id);
      if (index >= 0) {
        return prevTournaments;
      }
      const newTournaments = [...prevTournaments, tournament];
      return newTournaments;
    });
  }, []);

  const updateTournament = useCallback((tournament: Tournament) => {
    setTournaments((prevTournaments) => {
      const index = prevTournaments.findIndex((t) => t.id === tournament.id);
      if (index < 0) {
        return prevTournaments;
      }
      const newTournaments = [...prevTournaments];
      newTournaments[index] = tournament;
      return newTournaments;
    });
  }, []);

  const removeTournament = useCallback((tournamentId: string) => {
    setTournaments((prevTournaments) => {
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

  const setStatus = useCallback((tournamentId: string, status: TournamentStatus) => {
    const tournament = tournaments.find((t) => t.id === tournamentId);
    if (!tournament) {
      return;
    }
    updateTournament({
      ...tournament, status
    });
  }, [tournaments, updateTournament]);

  const startTournament = useCallback((tournamentId: string) => { setStatus(tournamentId, 'ongoing'); }, [setStatus]);

  const completeTournament = useCallback((tournamentId: string) => { setStatus(tournamentId, 'completed') }, [setStatus]);

  return useMemo(() => ({
    tournaments,
    addTournament,
    removeTournament,
    updateTournament,
    selectedTournament,
    selectTournament: setSelectedTournamentId,
    startTournament,
    completeTournament
  }), [tournaments, addTournament, removeTournament, updateTournament, selectedTournament, startTournament, completeTournament]);
};
