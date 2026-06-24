import type { NewsArticle } from "@/types";

export const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "Mise à jour de l'économie",
    summary:
      "Rééquilibrage des salaires, nouveaux métiers et ajustement des taxes municipales pour une économie plus immersive.",
    date: "2026-06-20",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    category: "Économie",
  },
  {
    id: "2",
    title: "Nouvelle ville : Port Azure",
    summary:
      "Découvrez Port Azure, une cité côtière futuriste avec son port de commerce, ses quartiers résidentiels et son tribunal.",
    date: "2026-06-15",
    imageUrl:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&q=80",
    category: "Carte",
  },
  {
    id: "3",
    title: "Événement RP : Élections municipales",
    summary:
      "Les candidats sont officiellement en campagne. Débats, meetings et vote le 1er juillet sur le serveur.",
    date: "2026-06-10",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80",
    category: "Événement",
  },
  {
    id: "4",
    title: "Patch anti-triche & performances",
    summary:
      "Amélioration des performances côté serveur et renforcement des mesures anti-triche pour un jeu plus fluide.",
    date: "2026-06-05",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
    category: "Technique",
  },
];
