import { createContext } from 'react';

interface LinkCommon {
  id: number;
  url: string;
  title: string;
  author: string;
  createdAt: string;
  height: number;
  width: number;
  tags: string[];
}

interface PhotoLink extends LinkCommon {
  type: 'photo';
}

interface VideoLink extends LinkCommon {
  type: 'video';
  duration: number;
}

export type Link = PhotoLink | VideoLink;

export default createContext({ links: [] as Link[], setLinks: (() => {}) as (links: Link[]) => void });
