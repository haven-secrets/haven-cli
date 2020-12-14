import { deleteProject } from "haven-secrets-core";
import prompts from "prompts";

const deleteProjectCli = async () => {
  (async () => {
    const response = await prompts({
      type: "text",
      name: "projectName",
      message: "What project would you like to delete?",
      validate: (projectName) =>
        /\s/.test(projectName)
          ? `Project Name Cannot Contain White Space`
          : true,
    });

    deleteProject(response.projectName);
  })();
};

export default deleteProjectCli;
