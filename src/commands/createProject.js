import { createProject } from "haven-secrets-core";
import prompts from "prompts";

const createProjectCli = async () => {
  (async () => {
    const response = await prompts({
      type: "text",
      name: "projectName",
      message: "What would you like your project named?",
      validate: (projectName) =>
        /\s/.test(projectName)
          ? `Project Name Cannot Contain White Space`
          : true,
    });

    createProject(response.projectName);
  })();
};

export default createProjectCli;
