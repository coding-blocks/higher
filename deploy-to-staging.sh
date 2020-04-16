export SERVER_USER=codingblocks
export SERVER=srv6.cb.lk

rm -rf dist/*
ember build --environment=staging
chmod 600 key.pem

ssh $SERVER_USER@$SERVER "mkdir ~/temp"
scp -r dist/* $SERVER_USER@$SERVER:~/temp
ssh $SERVER_USER@$SERVER "rm -rf ~/frontends/hiringblocks.staging/* && \
  cp -rf ~/temp/* ~/frontends/hiringblocks.staging && \
  rm -rf ~/temp/*"

