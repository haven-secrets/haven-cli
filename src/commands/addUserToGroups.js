import { addUserToGroups, listGroupsForUser } from "haven-secrets-core";
import prompts from "prompts";

const addUserToGroupsCli = async () => {
  (async () => {
    const havenGroups = await listGroupsForUser("HavenSecretsAdmin"); // TODO: Don't hardcode this
    const readableGroups = havenGroups.map((group) =>
      group.substring(12, group.length - 5)
    ); // remove 'HavenSecrets' and 'Group'
    const response = await prompts([
      {
        type: "text",
        name: "userName",
        message: "Which user would you like to give permissions to?",
        validate: (userName) =>
          /^\S+$/i.test(userName)
            ? true
            : `Username cannot contain white space`,
      },
      {
        type: "multiselect",
        name: "groups",
        message: "Would you like to attach any permissions to this user?",
        choices: readableGroups,
      },
    ]);
    const selectedGroups = response.groups.map((index) => `HavenSecrets${readableGroups[index]}Group`);
    await addUserToGroups(response.userName, ...selectedGroups);
    console.log(`Successfully added ${response.userName} to the following groups: ${selectedGroups.join(", ")}`);
  })();
};

export default addUserToGroupsCli;
