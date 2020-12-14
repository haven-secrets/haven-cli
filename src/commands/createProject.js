import { createProject } from "haven-secrets-core";
import prompts from "prompts";

const createProjectCli = async () => {
  (async () => {
    const response = await prompts({
      type: "text",
      name: "projectName",
      message: "What would you like your project named?",
      validate: (projectName) =>
        /^\S+$/i.test(projectName)
          ? true
          : `Project name cannot contain white space`,
    });

    createProject(response.projectName);
  })();
};

export default createProjectCli;
