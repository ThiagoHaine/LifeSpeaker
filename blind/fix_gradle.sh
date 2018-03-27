#!/bin/sh

if grep -q "com.android.support:support-v4:26.0.0" platforms/android/build.gradle; then
    echo "build.gradle already fixed"
else
	echo "configurations.all {\nresolutionStrategy.force 'com.android.support:support-v4:26.0.0'\n}" >> platforms/android/build.gradle
	echo "android platform fixed"
fi
