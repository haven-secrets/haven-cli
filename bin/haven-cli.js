#!/usr/bin/env node
import { program } from "commander";
import {
  listGroupsForUser,
  getAllHavenUsers,
  putSecret,
  getSecret,
  getAllSecrets,
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
  .command("t")
  .alias("teardown")
  .description("Teardown Haven Secrets Manager")
  .action(() => {
    teardown();
  });

program
  .command("f")
  .alias("fetchLogs")
  .description("Fetch all access logs")
  .action(() => {
    fetchLogsCli();
  });

program.parse(process.argv);
