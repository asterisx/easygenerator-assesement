#!/bin/bash

mongosh -- "$MONGO_INITDB_DATABASE" <<EOF
    var user = '$MONGO_APP_USERNAME';
    var passwd = '$MONGO_APP_PASSWORD';
    db.createUser({
        user: user,
        pwd: passwd,
        roles: [{ role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }]
    });
EOF