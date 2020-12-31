# [![LS-BrandDev-Haven_logo-full-on_light](https://user-images.githubusercontent.com/24786076/103423723-731d1d00-4b65-11eb-82a1-ef01c4840ed6.png)][github]

[![shields.io npm version badge](https://img.shields.io/npm/v/haven-secrets-cli)][npm]
[![shields.io npm license badge](https://img.shields.io/npm/l/haven-secrets-cli)][npm]
[![shields.io github closed pull requests badge](https://img.shields.io/github/issues-pr-closed/haven-secrets/haven-cli)][pull-requests]
[![shields.io custom website link badge](https://img.shields.io/static/v1?label=website&message=haven-secrets.github.io&color=blue)][website]

Haven is an open-source, centralized secrets manager. It protects your application secrets through a combination of encryption, access control, and injection-at-runtime. It’s easy to set up, and offers an intuitive GUI to set fine-grained access controls and to view logs. Haven allows small teams to securely manage all of their projects’ secrets---and to do so with a minimum of hassle so that they can get back to developing their applications without sacrificing security.

This package allows you to use a CLI to interact with your Haven instance. If you would prefer a GUI, use the [Haven UI][haven-ui] package instead. Both of these use the [Haven][haven-core] package under the hood to interact with the AWS architecture that makes up Haven.

## Usage as Admin

To use, you must first have an AWS account set up, your default credentials setup in `~/.aws/credentials` and your region setup in `~/.aws/config`.

Example `~/.aws/credentials`:

```
[default]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

Example `~/.aws/config`:

```
[default]
region=us-west-2
output=json
```

After that, simply:

1. Install the npm package globally (`sudo npm -g install haven-secrets-cli`)
2. Run `haven setup ${region}` specifying what supported region you want your Haven instance to be setup.
3. After setup, run any of the commands mentioned in the next section.
4. To create a new user, run `haven addUser ${userName}` passing in the user's name. This will
5. To teardown, simply run `haven teardown`.

## Usage as Developer

you don't need an AWS account setup since all users of a Haven instance use the account used during the setup by Admin

1. Install the npm package globally (`sudo npm -g install haven-secrets-cli`)
2. Place the `havenAccountInfo.json` file into a `~/.haven` directory.
3. Run `haven userSetup` within an hour after the Admin created your acccount.

## Commands

<table>
  <thead>
    <tr>
      <th>Command</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>haven&nbsp;setup</code>
      </td>
      <td>
        <p>
          This command creates a new Haven instance within the given region. When <code>haven new</code> is executed, Haven provisions the AWS resources it needs to run. </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;teardown</code>
      </td>
      <td>
        <p>
          Executing this command will teardown the Haven instance:
        </p>
        <ul>
          <li>
            All DynamoDb tables with their corresponding encrypted secrets.
          </li>
          <li>
            Schedule master key deletion
          </li>
          <li>
            Delete all users and logs.
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;createProject</code>
      </td>
      <td>
        <p>
          This command will prompt you to name your project and will create three[Dev, Prod, Stg] corresponding dynamoDB tables to store your encrypted secrets.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;deleteProject</code>
      </td>
      <td>
        <p>
          Executing this command will prompt you to select the project you want deleted. This will then delete the three dynamoDB tables and their corresponding secrets.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;addUser</code>
      </td>
      <td>
        <p>
          Executing this command will prompt you to select a user name and generate the <code>havenAccountInfo.json</code> file that you will give to the new user. They will have to run <code>haven userSetup</code> on their computer with that file within an hour, otherwise the credentials will be invalidated and you will have to run <code>haven addUser</code> again.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;userSetup</code>
      </td>
      <td>
        <p>This is the command a new user will run after placing their <code>havenAccountInfo.json</code> file into their <code>~/.haven</code> directory. If this command is run within an hour of credential creation, their temporary credentials will be replaced with their permanent credentials. This will grant them access to the projects/environments the Admin has granted them permission to.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;putSecret</code>
      </td>
      <td>
        <p>
          Executing this command will prompt for project name, environment, secret name and secret value. If the user has sufficient permissions and the project exists, Haven will put the encrypted secret value alongside the secret value into the corresponding dynamoDB table. If there is already a secret with the same name, a new version of the secret is instead placed into the table.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;getSecret</code>
      </td>
      <td>
        <p>
          Executing this command will prompt for project name, environment, and secret name. If the secret exists and the user has sufficient permission, the secret and its decrypted value will be returned.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;getAllSecrets</code>
      </td>
      <td>
        <p>
          Executing this command will prompt for project name and environment. If the user has sufficient permission, the latest version of all the secrets for that project and environment combination will be returned.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;addUserToGroups</code>
      </td>
      <td>
        <p>
          Executing this command will prompt for a user and the projects/environments you want them to have access to with either read or read-write permissions.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;listGroupsForUser</code>
      </td>
      <td>
        <p>
          Executing this command will prompt for a user and return all groups they belong to. A group represents an environment, project, and access permission combination.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;getAllHavenUsers</code>
      </td>
      <td>
        <p>
          Executing this command will return all Haven users for a Haven instance.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;revokeUser</code>
      </td>
      <td>
        <p>
          Executing this command will prompt for a user and revoke them from all projects/environments they have access to. Furthermore, it will flag all secrets they had access to so they can be updated.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;revokeUserFromGroups</code>
      </td>
      <td>
        <p>
          Executing this command will prompt for a user and what groups to revoke them from. The user will be removed from those groups and it will flag all secrets they had access to so those secrets can be updated.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;run</code>
      </td>
      <td>
        <p>
          This command is used to inject secrets into an application. The arguments expected are <code>projectName</code>,<code>environment</code>, and whatever start command you would normally use in your <code>npm start</code> script.
        </p>
        <p>
          For example, assuming your <code>start</code> script in your project's <code>package.json</code> was <code>"npx nodemon todos.js"</code> and you had put the corresponding secrets into a Haven project named <code>todos</code> under the environemnt <code>prod</code>, the new run command would be: <code>"haven run todos prod npx nodemon todos.js"</code>.
        </p>
        <p>
        When this command runs, it will retrieve all the secrets for the environment and project combination, spawn your application as a child process and inject them into the child process's environment. If your application logs any of the secrets to stdErr or stdOut, Haven will redact them and then pass them along on stdErr or stdOut accordingly.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;fetchLogs</code>
      </td>
      <td>
        <p>
          Executing this command will return all the logs for the Haven instance. These logs contain information on who created and accessed which secret at which time. These are logged regardless of whether the attempt was successful or not.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>haven&nbsp;help</code>
      </td>
      <td>
        <p>
          Display help information about Haven commands.
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Dependencies

- Node.js 12.x or greater
- npm packages (installed during `npm install`):
  - `commander`
  - `haven-secrets-core`
  - `prompts`

[npm]: https://www.npmjs.com/package/haven-secrets-cli
[pull-requests]: https://github.com/haven-secrets/haven-cli/pulls
[website]: https://haven-secrets.github.io/
[github]: https://github.com/haven-secrets/haven-cli
[haven-core]: https://github.com/haven-secrets/haven
[haven-ui]: https://github.com/haven-secrets/haven-ui
