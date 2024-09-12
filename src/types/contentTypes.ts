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

interface ApiIContent {
    title: string;
    courseId: string;
    modules: IChapter[]
    moduleId: string
    
}

interface courseContentDetails {
    courseId: string;
    title: string;
    ModuleId: string
}

export type { IContent, IChapter, ApiIContent ,courseContentDetails};