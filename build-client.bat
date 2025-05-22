@echo off
echo Building client...
cd client
call npm install
call npm run build

echo Build complete!
echo Please check the dist folder in the client directory. 