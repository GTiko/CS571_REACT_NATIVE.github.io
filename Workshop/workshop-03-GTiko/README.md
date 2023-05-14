# CS571-2023-05-Workshop03
## Contacts Application
* Create a new React Native application with Expo CLI to manage the contacts.
* Copy the `contacts.js` file into your project and install `react-native-uuid` (npm install). Note that this file has a default export for an array of sample contacts. Each contact has a `name` and `phone number`.
* Create a reusable `Contact` functional-component that displays a single contact (`name` and `phone`). Validate all `props` types.
* Display all contacts in `App` component using `ScrollView` component.
* Add a button to `App` to toggle displaying the list of contacts.
* Replace `ScrollView` with `FlatList` component and notice the performance difference with a big number of contacts.
* Add a button to sort the contacts by name alphabetically, descending and ascending.
* Add a button to display a form for adding a new contact:
* Create `AddContactForm` functional-component and handle adding the form values (both `name` and `phone`) where `phone` has to be 10 digits number. Validate all `props` types.
* Save all contacts to AsyncStorage and get all existing contacts when loading the application
