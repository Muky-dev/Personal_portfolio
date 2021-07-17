import React, { useState, useEffect } from 'react';
import './App.css';
import ProjectComponent from './components/project';
import { getProjects } from './API'

const App: React.FC = () => {

    const [projects, setProjects] = useState<IProject[]>([]);

    useEffect(() => {
        fetchProjects()
    });

    const fetchProjects = (): void => {
        getProjects()
            .then(({ data: { projects } }: IProject[] | any) => setProjects(projects))
            .catch((err: Error) => console.log(err));
    }

    return (
        <main className='App'>
            <div>
                <h1>Projects</h1>
                {projects.map((project: IProject) => (
                    <ProjectComponent
                        key={project._id}
                        project={project}
                    />
                )
                )}
            </div>
        </main>
    );
}

export default App;
