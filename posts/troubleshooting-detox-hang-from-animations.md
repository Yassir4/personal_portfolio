---
title: "Troubleshooting Detox Hang from Animations: 3 Practical Solutions"
date: "2023-09-05"
preview: "I recently had to add E2E testing using Detox to an existing application, the tests were smooth and easy to add, until I had to add them to a specific screen..."
---

I recently had to add E2E testing using Detox to an existing application, the tests were smooth and easy to add, until I had to add them to a specific screen then problems started to occur.

In this particular screen, the tests stopped running and Detox logged that the app was busy doing some tasks. By default, Detox synchronizes with the app by waiting for all the performing actions to complete and the app to become Idle, these actions can be network requests, animations, etc… see the list of actions in [Detox docs](https://wix.github.io/Detox/docs/troubleshooting/synchronization#what-operations-do-we-try-to-synchronize-with-automatically).

In my case, I had two performing actions that were running in a loop which caused tests to hang, an Animation loop, and a Carousel list.

I found 3 ways to work around this case.

### 1. Disable the **Synchronization**

As Detox handles Synchronization by default, we can disable it in certain places and enable it again.

Disable:

```
await device.disableSynchronization();
```

Enable:

```
await device.enableSynchronization();
```

While this workaround can do the trick, you’ll need to manually wait for a test to complete especially if it requires network requests or any other action that changes the state of the screen.

### 2. Mocking

In the case of the Animation loop, we have to mock the Animated API(in my case from the react-native)

Detox mocking is different from Jest. Detox mocking is related to React Native and Metro.

First, let’s create a folder named local_modules, then inside it create another folder with the name react-native-reanimated and inside it create two files, index.js and index.mock.js.

Inside the index.js we will export the react native package

```
export * from 'react-native'
```

Inside index.mock.js, we will export the mocked Animated API using the AnimatedMock from react-native.

```
import AnimatedMock from 'react-native/Libraries/Animated/AnimatedMock';
module.exports = { Animated: AnimatedMock, };
```

Then in our component, we will change the Animated import to point to the local_modules/react-native

```
import {Animated} from 'local_modules/react-native-animated'
```

Then we will need to configure the Metro resolver to use the mock.ts when running e2e tests by using an env variable, in our case I named it MY_APP_MODE.

```
resolver: {
sourceExts: process.env.MY_APP_MODE === 'mocked'
? ['mock.ts', …defaultSourceExts]
: defaultSourceExts,
},
```

Finally, to make this work you can either run

```
# in case of running e2e tests in dev mode
export MY_APP_MODE=mocked && react-native start

# or in case of a release build.
export MY_APP_MODE=mocked && your_detox_build_command
```

### 3. Hard Code

This option consists of adding conditions to make or prevent a certain piece of code from running when testing, for example in the carousel issue, I didn’t want to spend so much time mocking the flatlist scrollTo method, so I just added one condition and Voila problem solved.

## Some thoughts

I am sure that Mocking the animated API could be achieved using a better solution. Maybe by keeping the imports from react-native and configuring metro to pick the mocked animated API on testing, I didn’t find a way to configure such behavior in Metro but If you know how to do that please reach out to me on [Twitter](https://twitter.com/hartaniyassir), I would love to learn how it's done.

Thanks for reading !!
