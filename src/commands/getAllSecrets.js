import { getAllSecrets } from "haven-secrets-core";
import prompts from "prompts";

const getAllSecretsCli = async () => {
  (async () => {
    const response = await prompts([
      {
        type: "text",
        name: "projectName",
        message: "What's the project name?",
        validate: (projectName) =>
          /^\S+$/i.test(projectName)
            ? true
            : `Project name cannot contain white space`,
      },
      {
        type: "text",
        name: "environment",
        message: "Which environment would you like to access? (dev, stg, prod)",
        validate: (environment) =>
          /^(dev|stg|prod)$/i.test(environment)
            ? true
            : `Environment must be either dev, stg, or prod`,
      },
    ]);

    getAllSecrets(response.projectName, response.environment);
  })();
};

export default getAllSecretsCli;
