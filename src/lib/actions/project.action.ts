import { connect } from "../asraclient";
import {v4 as uuid} from 'uuid'
type PData={
    name:string,
    description:string
}


export async function getProjectData(projectId: string) {
  try {
      const db = await connect();
      const projectCollection = db.collection('projects');
      const projectData = await projectCollection.findOne({ _id: projectId });

      if (!projectData) {
          throw new Error('Project not found.');
      }

      return projectData;
  } catch (err) {
      console.error('Error fetching project data:', err);
      throw new Error('Internal server error');
  }
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
            { userId:"test-user-123" },
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
            label: project.name,
        }));
        return formattedProjects;
    }catch(err){
        console.log(err)
        throw new Error("Error fetching projects")
    }
}

export async function updateProjectData(data: string, projectId: string) {
    try {
      const db = await connect();
      const projectCollection = db.collection('projects');
  
      const newSection = {
        id: uuid(), 
        content: data, 
      };
  
      const response = await projectCollection.updateOne(
        { _id: projectId },
        {
          $push: { sections: newSection },
        }
      );
  
      if (response.modifiedCount === 0) {
        console.log('No document was updated.');
      } else {
        console.log('Project updated successfully.');
      }
    } catch (err) {
      console.error('Error occurred:', err);
      throw new Error('Error updating the project');
    }
  }
  
