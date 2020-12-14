import { deleteProject } from "haven-secrets-core";
import prompts from "prompts";

const deleteProjectCli = async () => {
  (async () => {
    const response = await prompts({
      type: "text",
      name: "projectName",
      message: "What project would you like to delete?",
      validate: (projectName) =>
        /^\S+$/i.test(projectName)
          ? true
          : `Project name cannot contain white space`,
    });

    deleteProject(response.projectName);
  })();
};

export default deleteProjectCli;
