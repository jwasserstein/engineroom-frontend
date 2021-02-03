# Todo
- Standardize all margins between blobs to either 15px or 20px.
- Add some hover effect to friend and car blurbs to indicate that they're clickable (translate, background color change, or box shadow change)
- Add a way to edit your profile: image, bio, name, etc.
- Replace outline on all form fields with box-shadow
- Clean up authReducer vs userReducer.  Why store the user's information in two places in two formats?  userReducer[user.userId].firstName isn't very elegant