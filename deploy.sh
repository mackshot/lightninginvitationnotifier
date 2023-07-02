#!/bin/bash
rm lightninginvitationnotifier.xpi
7zz a -tzip -x!.git -x!.idea -x!.gitignore -x!deploy.sh -x!deploy.bat lightninginvitationnotifier.xpi *
