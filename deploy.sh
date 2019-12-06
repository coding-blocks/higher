rm -rf dist/*
ember build --environment=production
chmod 600 key.pem

ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "mkdir ~/temp"
scp -o StrictHostKeyChecking=no -i key.pem -r dist/* $USER@$SERVER:~/temp
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf ~/frontends/hiringblocks/* && \
  cp -rf ~/temp/* ~/frontends/hiringblocks && \
  rm -rf ~/temp"

