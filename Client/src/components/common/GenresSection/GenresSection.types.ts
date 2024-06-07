export type Genre = {
  id: string;
  title: string;
  href: string;
};

export type GenresSectionProps = {
  title: string;
  genres: Genre[];
};
