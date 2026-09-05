#!/bin/bash
rm lightninginvitationnotifier.xpi
7za a -tzip -x!.git -x!.idea -x!.serena -x!.gitignore -x!deploy.sh -x!deploy.bat lightninginvitationnotifier.xpi *
