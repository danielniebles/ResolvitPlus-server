export interface RawMovie {
  vote_average: number;
  original_title: string;
  poster_path: string;
  backdrops?: { width: number; file_path: string }[];
  overview?: string;
  id: number;
  genres: number[];
}
