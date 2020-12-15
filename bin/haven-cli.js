#!/usr/bin/env node
import { program } from "commander";
import {
  addUser,
  addUserToGroups,
  revokeUser,
  revokeUserFromGroups,
  getAllHavenUsersAndGroups,
  teardown,
  setup,
} from "haven-secrets-core";

import fetchLogsCli from "../src/commands/fetchLogs.js";
import createProjectCli from "../src/commands/createProject.js";
import deleteProjectCli from "../src/commands/deleteProject.js";
import getSecretCli from "../src/commands/getSecret.js";
import putSecretCli from "../src/commands/putSecret.js";
import listGroupsForUserCli from "../src/commands/listGroupsForUser.js";
import getAllHavenUsersCli from "../src/commands/getAllHavenUsers.js";
import getAllSecretsCli from "../src/commands/getAllSecrets.js";

program.version("0.0.1");

program
  .command("s")
  .alias("setup")
  .description("Setup Haven Secrets Manager")
  .action(() => {
    setup();
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

program.parse(process.argv);
