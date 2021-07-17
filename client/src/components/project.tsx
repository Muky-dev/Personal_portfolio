import React from "react";

type Props = ProjectProps

const Project: React.FC<Props> = ({ project }) => {
    const underDevelopment = project.dev_status ? "yes" : "no";
    return (
        <div className="Card">
            <a href={project.url}>
                <div className="Card--image">
                    <img src={project.image_url} alt={project.name}></img>
                </div>
                <div className="Card--text">
                    <h1>{project.name}</h1>
                </div>
            </a>
            <div className="Card--status">
                <p>Under Development? {underDevelopment}</p>
            </div>
        </div>
    );
}

export default Project