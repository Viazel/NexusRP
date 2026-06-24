/** Compte joueur (Microsoft + profil RP in-game) */
export interface UserAccount {
  microsoftEmail: string;
  minecraftUsername: string;
  characterName: string;
  job: string;
  grade: string;
  bankBalance: number;
}

/** Profil RP du joueur connecté */
export type PlayerProfile = Omit<UserAccount, "microsoftEmail">;

/** Article d'actualité du serveur */
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  category: string;
}

/** Statut du serveur Minecraft */
export interface ServerStatus {
  online: boolean;
  playerCount: number;
  maxPlayers: number;
  version: string;
}
