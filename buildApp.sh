# ------- constant part
PURPLE='\033[0;35m';
GREEN='\033[0;32m';
BIG='\033[1m';
NC='\033[00m'; # --> no transformation

echo "${PURPLE}${BIG}BUILD IS STARTING ...${NC}"

# -- init command
rm public/my-weather-app.aab # ------> clean final directory

#  -- BUILD part
cd ./android && ./gradlew bundleRelease && cd ../ # -------> run android bundle app build release (gradle script)

echo "${PURPLE}${BIG}COPIYING APK...${NC}"

# -- finalize build
cd ./android/app/build/outputs/bundle/release && cp app-release.aab ../../../../../../public/my-weather-app.aab

echo "${PURPLE}${BIG}PROCESS ENDED${NC}"
# -- end process