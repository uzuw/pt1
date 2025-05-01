// types/projectTypes.ts

export interface AddProjectInput {
    name: string;
    description: string;
    status: 'Not Started' | 'In Progress' | 'Completed'; // match your enum
    startDate?: string;
    githubRepoUrl?: string;
    tags?: string[];
    user:string;
  }
  
  export interface AddProjectResponse {
    addProject: {
      id: string;
      name: string;
      description: string;
      status: 'Not Started' | 'In Progress' | 'Completed';
      startDate?: string;
      githubRepoUrl?: string;
      tags: string[];
      user:string;
    };
  }
  