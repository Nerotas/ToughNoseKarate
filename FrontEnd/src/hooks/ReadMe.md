# Intro to React Query

## [Overview](https://react-query.tanstack.com/overview)

React Query is often described as the missing data-fetching library for React, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your React applications a breeze.

Simply put, React Query is a library that uses your Existing fetch protocols (in our case axios) and creates a global state manager. It assigns a label to each call and caches the data. The same data can be called from another component without the need to request again. It also will create a "refresh" function that can be used to refetch data. It is also possible to set up retry intervals and automatic refetching based one events.

In this folder, you will see the four basic calls and how to use them in each file. They are named after their HTTP protocols.
