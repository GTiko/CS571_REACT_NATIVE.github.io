# CS571-2023-05-assignment06
## React Navigation
Create a new React Native app with Expo-CLI and use [React Navigation](https://reactnavigation.org/) to support the following app structure.

## Structure
* `Home` *(Bottom Tab Navigator)*
    * `Camera` *Screen*
      * `Photo` *Reusable Component*
    * `History` *(Stack Navigator)*
      * `Dates`*Screen* 
      * `Pictures` *Screen*

## Implement the following screens features
* `Photo` component
  * Show the `camera`
  * `Flip` button: To change the camera to back or front
  * `Capture` button: To take a picture
* `Dates` component: Shows all dates that you have taken pictures. When users click on any date, it will navigate to all images you have on that date. It does not have a header.
* `Pictures` component: Show all pictures on the selected date from the `Dates` component. The header shows the date.

