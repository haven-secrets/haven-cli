import {
  revokeUserFromGroups,
  getAllHavenUsers,
  listGroupsForUser,
} from "haven-secrets-core";
import prompts from "prompts";

const revokeUserFromGroupsCli = async () => {
  (async () => {
    const users = await getAllHavenUsers();
    const usernames = [];
    const havenUser = (i) => {
      return (
        users[i].UserName !== "HavenSecretsAdmin" &&
        !users[i].UserName.startsWith("HavenSecretsTemporary")
      );
    };

    for (let i = 0; i < users.length; i++) {
      if (havenUser(i)) {
        usernames.push(users[i].UserName);
      }
    }

    const userNameResponse = await prompts({
      type: "select",
      name: "userName",
      message: "Which user would you like to revoke permissions?",
      choices: usernames,
    });

    const groups = await listGroupsForUser(
      usernames[userNameResponse.userName]
    );
    const readableGroups = [];
    for (let i = 0; i < groups.length; i++) {
      if (groups[i] !== "HavenSecretsLogGroup") {
        // TODO don't hardcode
        readableGroups.push(groups[i].slice(12, groups[i].length - 5));
      }
    }

    const groupsResponse = await prompts({
      type: "multiselect",
      name: "groups",
      message: "Which perissions would you like to revoke from this user?",
      choices: readableGroups,
    });
    const groupsSelection = groupsResponse.groups.map(
      (group) => `HavenSecrets${readableGroups[group]}Group`
    );
    console.log(groupsSelection);
    await revokeUserFromGroups(
      usernames[userNameResponse.userName],
      ...groupsSelection
    );
  })();
};

export default revokeUserFromGroupsCli;
