interface IContent {
    _id: string;
    type: 'video' | 'document';
    title: string;
    url: string;
    duration?: number;
  }
  
  interface IChapter {
    _id: string;
    title: string;
    contents: IContent[];
  }
  
  export type { IContent, IChapter };