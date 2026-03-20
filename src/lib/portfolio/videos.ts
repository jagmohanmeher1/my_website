export type Video = {
  slug: string;
  title: string;
  embedUrl: string;
  source?: string;
};

const yt = (id: string) => `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;

export const videos: Video[] = [
  {
    slug: 'cv-ai-workshop-part-1',
    title: 'CV and AI Workshop - Part 1',
    embedUrl: yt('S6ZB0Atkh7M')
  },
  {
    slug: 'cv-ai-workshop-part-2',
    title: 'CV and AI Workshop - Part 2',
    embedUrl: yt('N3lLSHrJBH0')
  }
];

