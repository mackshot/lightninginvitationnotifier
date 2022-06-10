#!/bin/bash
rm lightninginvitationnotifier.xpi
7z a -tzip -x!.git -x!.idea -x!.gitignore -x!deploy.sh lightninginvitationnotifier.xpi *