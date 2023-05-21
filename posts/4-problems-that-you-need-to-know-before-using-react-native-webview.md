---
title: '4 Problems that You Need to Know Before Using React Native Webview'
date: '2021-12-27'
preview: 'Over the last year, I’ve been working on a react native app that uses Webview to display Html emails, during the process I’ve faced some uncommon problems that took us a...'
---


Over the last year, I’ve been working on a react native app that uses Webview to display Html emails, during the process I’ve faced some uncommon problems that took us a long time to solve.

My purpose in this article is to save you time by showing you the problems you may encounter and how to solve them.

### Problem 1: WebView Dynamic height


React Native Webview can’t set its own height like the ‘<View />’ which can scale based on its content

The only way a webview can have a height is by providing a specific one to it.

![webview height](/dynamic-height-webview.jpg)
Here we injected a script after the webview finishes loading using the **_injectJavascript_** _prop_ that will get the content height and then update the webview height.

### Problem 2: Webview may lead to crashing the app in android

This one was tricky to find, we were having some unexpected crashes in the app while navigating from some screens, at first we did what every experienced react native developer will do, run \`_adb logcat_\` command and spend hours debugging what causes the crash.

Luckily we found [this GitHub Issue](https://github.com/react-navigation/react-navigation/issues/9061) that fixes our problem and the fix was just disabling navigation animation in the screens that include a webview

There are other react-navigation and webview crashes fixes that may work for others, check out this [react-native-youtube-iframe doc](https://lonelycpp.github.io/react-native-youtube-iframe/navigation-crash/) for more info.

### Problem 3: Importing local HTML File in webview \[Android\]


Importing local HTML files inside webview differs between expo and bare react native.

In a bare React native project it’s quite simple you just need to add the file to the android asset and import it from there.  
check out the full workaround [here](https://stackoverflow.com/a/61473740/7951454).

In an expo project, as we don’t have access to the android folder, you can use this workaround.

![webview in android](/expo-asset-webview.jpg)

### Problem 4: Test the webview on older android versions

If you find yourself adding a custom HTML file with javascript inside it, make sure to test the webview on older versions as in my case I was using some new javascript features like optional chaining that lead to breaking the webview in the android version 8.

### Thanks for reading 📚

I hope this article can help you when facing some unexpected webview issue 💪

[Github](https://github.com/yassir4) | [Twitter](https://twitter.com/hartaniyassir/) ✈️


