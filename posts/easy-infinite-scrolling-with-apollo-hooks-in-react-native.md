---
title: Easy Infinite Scrolling With Apollo Hooks in React Native
date: '2020-09-15'
preview: 'Infinite scrolling is a feature that you can see in a lot of modern apps(Facebook, Tweeter, Reddit, etc…), every time the list data in your app...'
---

Infinite scrolling is a feature that you can see in a lot of modern apps(Facebook, Tweeter, Reddit, etc…), every time the list data in your app gets bigger you will need to add this feature to optimize your list performance.

So In this article, we’ll implement the infinite scrolling using apollo hooks

Note: I expect that you already have a react-native project initialized with apollo client, also I’ll be using the GitHub Graphql API as an endpoint to display a list of repositories, please also make sure to create a personal access token here and attach it in the apollo header😁.

So Let’s get started.

### First, let’s build our basic list component.

For now, we’ll add just the basics in our list component: the repositories query, a flatlist, and a useQuery from apollo hooks to fetch the data.

```js
import React from 'react'
import { Text, SafeAreaView, View, FlatList, ActivityIndicator } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import RepositoryItem from './components/RepositoryItem'
import styles from './styles'

const REPOSITORIES_QUERY = gql`
 query($first: Int!) {
   organization(login: "facebook") {
     repositories(first: $first) {
       pageInfo {
         endCursor
         hasNextPage
       }
       nodes {
        id
         name
         updatedAt
         forkCount
         description
         url
       }
     }
   }
 }
`
const RepositoriesScreen = () => {
 const { data, error, loading } = useQuery(REPOSITORIES_QUERY, { variables: { first: 15 } })

 let repositories = []
 if (data && data.organization && data.organization.repositories)
   repositories = data.organization.repositories.nodes

 const renderItem = (props: any) => <RepositoryItem {...props} />
 // first time loading
 if (loading && repositories.length === 0)
   return (
     <View style={styles.loading}>
       <ActivityIndicator size="large" color="rgb(0, 122, 255)" />
     </View>
   )
 if (error)
   return (
     <View style={styles.loading}>
       <Text style={styles.errorText}>Something went wrong</Text>
     </View>
   )

 return (
   <SafeAreaView style={styles.container}>
     <FlatList
       data={repositories}
       renderItem={renderItem}
       keyExtractor={(item) => item.id}
       contentContainerStyle={{ flexGrow: 1 }}
     />
   </SafeAreaView>
 )
}

export default RepositoriesScreen
```

- Here we added a query to fetch the Facebook repositories with a first variable that will allow us to specify the number of the items being fetched.

- the pageInfo in query contains two values(endcursor and hasNextPage) which we’ll use when fetching a new set of repo’s.


### Add The Infinite scroll

To add the infinite scroll functionality we’ll use the fetchMore function from the useQuery result,

This will allow us to make a new query with and merge the new result into the original result. You can read more about this function [here](https://www.apollographql.com/docs/react/data/pagination/#using-fetchmore).

```js
const { data, error, loading, fetchMore } = useQuery(REPOSITORIES_QUERY, {
   variables: { first: 15 },
 })
```

Now let’s add the function that will handle the fetchMore

```js
const handleOnEndReached = () => {
   if (data.organization.repositories.pageInfo.hasNextPage)
     return fetchMore({
       variables: {
         after: data.organization.repositories.pageInfo.endCursor,
         first: 15,
       },
       updateQuery: onUpdate,
     })
 }
.
.
.

<FlatList
    ...
    onEndReachedThreshold={1}
    onEndReached={handleOnEndReached}
/>
```

Before we fetch more data I checked if there is more data available with `hasNextPage` which is a good thing to prevent unnecessary network requests (optional), then we passed the after and first variables, the after here refer to the endCursor(the last item fetched) this method is called cursor-based pagination you can read more about it here.

Now when the update will complete the onUpdate function will be fired, this function will be responsible for merging the previous data with the new one.

```js
/// ...
 
const onUpdate = (prev, { fetchMoreResult }) => {
   if (!fetchMoreResult) return prev
   const { pageInfo } = fetchMoreResult.organization.repositories
   const nodes = [
     ...prev.organization.repositories.nodes,
     ...fetchMoreResult.organization.repositories.nodes,
   ]
   return Object.assign({}, prev, {
     organization: {
       __typename: prev.organization.__typename,
       repositories: {
         __typename: prev.organization.repositories.__typename,
         pageInfo,
         nodes,
       },
     },
   })
 }

// ...
```

Note that we inserted the new repo’s at the end of the list and we updated the pageInfo so we have its new values.

### Pull Refresh

In a lot of cases, we’ll need to implement the pull refresh along with the infinite scrolling, for that we’ll use the refetch function from the useQuery result.

```js
import { NetworkStatus } from '@apollo/client'
.
.
.
const { data, error, loading, fetchMore, refetch, networkStatus } = useQuery(REPOSITORIES_QUERY, {
   variables: { first: 15 },
   notifyOnNetworkStatusChange: true,
 })
```

Here we also added the networkstatus property to identify the status of our query, and we set the notifyOnNetworkStatusChange option to true in order to trigger a rerender in our component when the refetch is called.

```js
// add this
const refreshing = networkStatus === NetworkStatus.refetch
// prevent the loading indicator from appearing while refreshing
 if (loading && repositories.length === 0 && !refreshing)
   return (
     <View style={styles.loading}>
       <ActivityIndicator size="large" color="rgb(0, 122, 255)" />
     </View>
   )


// then add proper props to flatlist

<FlatList
  ...
  onRefresh={refetch}
  refreshing={refreshing} // to display the pull refresh indicator
  />
```

The refreshing constant will be set to true when the refetch function will be triggered, and notice how we prevented the first loading from rendering when refreshing is set to true.

### Thanks for reading 📚

→ You can find the source code in this [repo](https://github.com/Yassir4/InfiniteScrollApolloHooks).
****