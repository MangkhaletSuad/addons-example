export interface Post {
    id: string;
    status: string;
    image: string;
    name: string;
    DateTime: string;
    Location: string;
    note: Note[];
  }
  
  export interface Note {
    id: string;
    content: string;
  }
  