import { listGroupsForUser } from "haven-secrets-core";
import prompts from "prompts";

const listGroupsForUserCli = async () => {
  (async () => {
    const response = await prompts({
      type: "text",
      name: "userName",
      message: "What user do you want to see the groups for?",
      validate: (userName) =>
        /^\S+$/i.test(userName) ? true : `User name cannot contain white space`,
    });

    const groups = await listGroupsForUser(response.userName);
    console.log(groups);
  })();
};

export default listGroupsForUserCli;
