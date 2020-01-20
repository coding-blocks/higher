export SERVER_USER=codingblocks
export SERVER=srv9.cb.lk

rm -rf dist/*
ember build --environment=production
chmod 600 key.pem

ssh -o StrictHostKeyChecking=no -i key.pem $SERVER_USER@$SERVER "mkdir ~/temp"
scp -o StrictHostKeyChecking=no -i key.pem -r dist/* $SERVER_USER@$SERVER:~/temp
ssh -o StrictHostKeyChecking=no -i key.pem $SERVER_USER@$SERVER "rm -rf ~/frontends/hiringblocks/* && \
  cp -rf ~/temp/* ~/frontends/hiringblocks && \
  rm -rf ~/temp"

