interface IProject {
    _id: string
    name: string
    url: string
    image_url: string
    dev_status: boolean
    createdAt?: string
    updatedAt?: string
}

interface ProjectProps {
    project: IProject
}

interface ApiDataType {
    message: string
    status: string
    project: IProject
    projects: IProject[]
}