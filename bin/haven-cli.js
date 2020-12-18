#!/usr/bin/env node
import { program } from "commander";
import {
  revokeUser,
  revokeUserFromGroups,
  getAllHavenUsersAndGroups,
  teardown,
  setup,
  userSetup,
} from "haven-secrets-core";

import fetchLogsCli from "../src/commands/fetchLogs.js";
import createProjectCli from "../src/commands/createProject.js";
import deleteProjectCli from "../src/commands/deleteProject.js";
import getSecretCli from "../src/commands/getSecret.js";
import putSecretCli from "../src/commands/putSecret.js";
import listGroupsForUserCli from "../src/commands/listGroupsForUser.js";
import getAllHavenUsersCli from "../src/commands/getAllHavenUsers.js";
import getAllSecretsCli from "../src/commands/getAllSecrets.js";
import addUserCli from "../src/commands/addUser.js";
import addUserToGroupsCli from "../src/commands/addUserToGroups.js";
import revokeUserCli from "../src/commands/revokeUser.js";
import revokeUserFromGroupsCli from "../src/commands/revokeUserFromGroups.js";

program.version("0.0.1");

program
  .command("s")
  .alias("setup")
  .description("Setup Haven Secrets Manager")
  .action(() => {
    setup();
  });

program
  .command("us")
  .alias("userSetup")
  .description("Setup Haven Secrets User")
  .action(() => {
    userSetup();
  });

program
  .command("cp")
  .alias("createProject")
  .description("Create Haven Project")
  .action(() => {
    createProjectCli();
  });

program
  .command("dp")
  .alias("deleteProject")
  .description("Delete Haven Project")
  .action(() => {
    deleteProjectCli();
  });

program
  .command("g")
  .alias("getSecret")
  .description(
    "Get latest secret version by default or specify specific version"
  )
  .action(() => {
    getSecretCli();
  });

program
  .command("ga")
  .alias("getAllSecrets")
  .description("Get the latest secrets for a project's environment")
  .action(() => {
    getAllSecretsCli();
  });

program
  .command("p")
  .alias("putSecret")
  .description("Create or update a secret")
  .action(() => {
    putSecretCli();
  });

program
  .command("lg")
  .alias("listGroupsForUser")
  .description("List all groups for a user")
  .action(() => {
    listGroupsForUserCli();
  });

program
  .command("gh")
  .alias("getAllHavenUsers")
  .description("Get all Haven Users")
  .action(() => {
    getAllHavenUsersCli();
  });

program
  .command("f")
  .alias("fetchLogs")
  .description("Fetch all access logs")
  .action(() => {
    fetchLogsCli();
  });

program
  .command("t")
  .alias("teardown")
  .description("Teardown Haven Secrets Manager")
  .action(() => {
    teardown();
  });

program
  .command("au")
  .alias("addUser")
  .description("Add User")
  .action(() => {
    addUserCli();
  });

program
  .command("ag")
  .alias("addUserToGroups")
  .description("Add User to groups")
  .action(() => {
    addUserToGroupsCli();
  });

program
  .command("r")
  .alias("revokeUser")
  .description("Revoke User")
  .action(() => {
    revokeUserCli();
  });

program
  .command("rg")
  .alias("addUserToGroups")
  .description("Add User")
  .action(() => {
    revokeUserFromGroupsCli();
  });

program.parse(process.argv);
