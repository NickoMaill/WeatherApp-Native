# ------- constant part
PURPLE='\033[0;35m';
GREEN='\033[0;32m';
BIG='\033[1m';
NC='\033[00m'; # --> no transformation

echo "${PURPLE}${BIG}BUILD IS STARTING ...${NC}"
rm public/weatherAppDebug.apk
npm run build-android-debug
echo "${PURPLE}${BIG}COPIYING APK...${NC}"
cd ./android/app/build/outputs/apk/debug && cp app-debug.apk ../../../../../../public/weatherAppDebug.apk

echo "${PURPLE}${BIG}PROCESS ENDED${NC}"