# Recent GitHub
A widget which displays recent personal repository activity on GitHub. Meant for showcasing work you have been doing on 
projects by using the GitHub API.

# Table Of Contents
- [Design](#design)
    - [Library](#library)
    - [View](#view)

# Design
The design of the recent GitHub widget is split into two parts. The library and the view.  

The library is responsible for interacting with the GitHub API and outputting useful data to display. The view system is 
responsible for binding the library to an interface which the user can view and interact with.

## Library
The library provides a client interface which one can use to fetch recent personal repository information.

### Client Interface
To use the client interface create a new `Client` instance. The `Client` constructor takes a GitHub username and a set 
of optional options for arguments (See the [Client.constructor](#clientconstructor) documentation for more).

```javascript
// Client constructor with default options
var client = new Client("Noah-Huppert", {
    sort: "pushed"
});
```

This `Client` instance can then be used to retrieve recent personal repository activity for the Noah-Huppert GitHub user.  

#### `Client Client.constructor(username, options)`
Creates a instance of `Client`.

##### Arguments
- username (String): The GitHub username of the user to fetch recent repository activity for
- options (Object): An optional options object
    - Can provide any options from the [GitHub API Users Repos Endpoints](https://developer.github.com/v3/repos/#list-your-repositories) 
    - If no options argument is provided the default options are:
        - sort = "pushed": This sorts the returned repository list by most recent Git commit push date and time
        
#### Returns
- Client: A new `Client` instance with the provided options
        
### `[Repo] Client.getRecentRepositories(limit)`
With default `Client` options this method will return a list of recent repositories which the provided user pushed to. 
The results of this GitHub API request will be augmented with the options provided in the `Client.constructor`.

#### Arguments
- limit (Integer): Optional user provided limit on how many repositories will be returned
    - By default the limit is `5`
    - If one would like the method to return unlimited repositories provide `-1` as the limit

#### Returns
- [Repo]: List of `Repo` objects representing recent repository activity

## View
The view system provides a user interface to view and interact with the library results. One can view the recent 
repositories of a user by creating a `recent-github` Polymer Web Component:

```html
<recent-github username="Noah-Huppert" options="[[recentGhOpts]]" limit="7"></recent-github>
```

### Properties
The `recent-github` component provides all the options necessary to fully customize the library's behavior. 

#### `username` (String)
GitHub username of user to show recent repositories for.

#### `options` (Object)
Optional options object which will be passed to the library `Client` constructor. Can be used to augment the behavior of 
the library. See [`Client.constructor`](#clientconstructor) for more information.

#### `limit` (Integer)
The number of repositories to show for a user. Defaults to `5`. For no limit provide `-1`.