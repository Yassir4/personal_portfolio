---
title: 'How to quickly setup multiple Graphql endpoints in Apollo Client and Codegen [React]'
date: '2022-11-10'
preview: 'Recently I had to add a new Graphql endpoint, as I was using Codegen and typescript I had to make sure that I’ll benefit from type-checking...'
---

Recently I had to add a new Graphql endpoint, as I was using Codegen and typescript I had to make sure that I’ll benefit from type-checking on both of the endpoints.

In this post, you will learn how to quickly setup a new Graphql endpoint in 2 easy Steps.

### Step1: Add the new endpoint to Apollo Client


```
//Declare your endpoints
const endpoint1 = new HttpLink({
    uri: 'https://api.hashnode.com/graphql',
    ...
})
const endpoint2 = new HttpLink({
    uri: 'endpoint2/graphql',
    ...
})

//pass them to apollo-client config
const client = new ApolloClient({
    link: ApolloLink.split(
        operation => operation.getContext().clientName === 'endpoint2',
        endpoint2, //if above 
        endpoint1
    )
    ...
})

//pass client name in query/mutation
useQuery(QUERY, {variables, context: {clientName: 'endpoint2'}})
```

If you don’t use Typescript and Codegen this step is all you need, here you just need to add the clientName in every query and mutation the request needs to goes to the endpoint2.
Credit should go to the owner of this [StackOverflow answer](https://stackoverflow.com/a/69629525/7951454).

### Step2: Generate the Graphql schema and types with Codegen
With multiple endpoints, we’ll need to generate multiple schemas which will generate the API types in separate files.

To do this we’ll need to start by writing Graphql requests of each endpoint in separate files, for example, the endpoint1 query will go under **.grapqhl.ts the file name, and endpoint2 will be in **.graphqlEndpoint2.ts
This way we can target each schema generation easily in codegen.ts.

Finally using useQuery and adding the context clientName can be a bit tricky and redundant to solve that we’ll use the typescript-react-apollo plugin to generate typed apollo hooks so instead of this 👇

![get customers](/getCustomers.graphql.jpg)

You can use the generated apollo hook getCustomersQuery like this 👇

![customers component](/customersComponent.jpg)

To achieve this behavior we need to add some configs inside the Codegen config file 👇

![customers component](/codegen.jpg)

What made it possible to use apollo hooks with the clientName is the defaulsBaseOptions from typescript-react-apollo you can check this PR for more details.

Thanks for reading 📚