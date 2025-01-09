import { connect } from "../asraclient";

type PData={
    name:string,
    description:string
}

export async function createProject(projectData: PData, userId: string) {
    try {
        const db = await connect();
        const projectCollection = db.collection('projects');
        
        const newProject = await projectCollection.insertOne({
            name: projectData.name,
            description: projectData.description,
            createdAt: new Date(),
            createdBy:userId
        });

        const projectId = newProject.insertedId;

        const userCollection = db.collection('users');
        await userCollection.updateOne(
            { userId },
            { $push: { projects: projectId } }
        );

        return projectId;
    } catch (err) {
        console.error(err);
        throw new Error("Error creating project.");
    }
}

export async function getProjects() {
    try{
        const db = await connect();
        const projectCollection = db.collection('projects')
        const projects = await projectCollection.find({createdBy:'test-user-id-123'},{projection:{_id:1,name:1}}).toArray();
        const formattedProjects = projects.map(project => ({
            id: project._id, 
            label: project.label,
        }));
        return formattedProjects;
    }catch(err){
        console.log(err)
        throw new Error("Error fetching projects")
    }
}
