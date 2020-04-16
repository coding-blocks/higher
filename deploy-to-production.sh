export SERVER_USER=codingblocks
export SERVER=srv9.cb.lk

rm -rf dist/*
ember build --environment=production
chmod 600 key.pem

ssh $SERVER_USER@$SERVER "mkdir ~/temp"
scp -r dist/* $SERVER_USER@$SERVER:~/temp
ssh $SERVER_USER@$SERVER "rm -rf ~/frontends/hiringblocks/* && \
  cp -rf ~/temp/* ~/frontends/hiringblocks && \
  rm -rf ~/temp/*"

