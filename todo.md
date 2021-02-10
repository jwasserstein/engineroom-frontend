# Todo
- Standardize all margins between blobs to either 15px or 20px.
- Add handling for token expiration
- Add <Message> to all pages which perform API calls and therefore could have errors
- Fix infinite loop if backend doesn't respond
- Replace if(!data) return <div>Loading...</div>; with loggedInUser = userReducer.users[authReducer.userId] || {};  Empty object will prevent errors
- Verify responsiveness of all pages, including the middle-ground between desktop and mobile
- Ensure you can edit a profile with the default image


## Right Now
- Message
- Token expiration
- Deployment
- Add to portfolio

## Potential Expansion Ideas
- Add ability to delete and edit cars.  Add red X in top right corner to delete, pencil icon to edit.  Editing brings you back to the new car page with the fields pre-populated with the car's existing data.
- Add progress bar to image uploads for car and profile images.  They're kinda slow.
- Add search functionality or some other way of finding other users that aren't suggested by <ExplorePage> or already on the feed
- Add infinite scrolling


### Error Refactor Changes
- Replace loading boolean with fetching count in state
- Add error Message import and component in render()
- Add error state 
- Ensure there are .then() and .catch() calls for each promise, increment and decrement fetching
- Add onClearError() and it's constructor binding
- Replace check for data existence with || {}