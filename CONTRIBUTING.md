Contributing to eth-cli
=======================

_Thanks for taking the time to help out and improve eth-cli! :tada:_

The following is a set of guidelines for eth-cli contributions and may change
over time. Feel free to suggest improvements to this document in a pull request!

Contents
--------

[How Can I Contribute?](#how-can-i-contribute)

[Development](#development)
  - [Overview](#overview)
  - [Development Requirements](#development-requirements)
  - [Getting Started](#getting-started)
  - [Forks, Branches, and Pull Requests](#forks-branches-and-pull-requests)
    - [Branching Model](#branching-model)
    - [Working on a Branch](#working-on-a-branch)

[Additional Notes](#additional-notes)


How Can I Contribute?
---------------------

All contributions are welcome!

If you run into an issue, the first step is to report a problem or to suggest a new feature, [open a GitHub Issue](https://github.com/protofire/eth-cli/issues/new).
This will help the eth-cli maintainers become aware of the problem and prioritize a fix.


For code contributions, for either new features or bug fixes, see [Development](#development).

If you're looking to make a substantial change, you may want to reach out first to give us a heads up.


Development
-----------

### Overview

This repository ([protofire/eth-cli](https://github.com/protofire/eth-cli)) is a collection of CLI tools to help with ethereum learning and development.


### Development Requirements

In order to develop eth-cli, you'll need:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org)

### Getting Started

First clone this repository and install NPM dependencies:

    $ git clone git@github.com:protofire/eth-cli.git
    $ cd eth-cli
    $ npm install

### Forks, Branches, and Pull Requests

Community contributions to eth-cli require that you first fork the
repository you are modifying. After your modifications, push changes to your fork and submit a pull request upstream to `eth-cli`'s fork(s).

See GitHub documentation about [Collaborating with issues and pull requests](https://help.github.com/categories/collaborating-with-issues-and-pull-requests/) for more information.

> :exclamation: **Note:** _eth-cli development uses a long-lived `master` branch for new (non-hotfix)
> development. Pull Requests should be opened against `master` in all
> repositories._

#### Branching Model

eth-cli project maintains one stable branch:

  - **`master`**, for latest full releases and work targeting a patch release


#### Working on a Branch

Use a branch for your modifications, tracking it on your fork:

    $ git checkout -b feature/sweet-feature
    $ git push --set-upstream origin feature/sweet-feature

Then, make changes and commit as usual.


Additional Notes
----------------

Some things that will increase the chance that your pull request is accepted:

* Write tests.
* Write a [good commit message][commit].

[commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

**Thanks again for all your support, encouragement, and effort! eth-cli would not
be possible without contributors like you. :bow:**
