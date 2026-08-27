# Shopping List App Planning

## Project Goal

Build a responsive React and TypeScript shopping-list application where users can register, log in, manage their profiles, and create, update, delete, search, sort, favourite, and share shopping items.

## Target User

People who want a simple way to organise items they need to buy, including groceries, clothing, electronics, and home items.

## Core Features

- Register and log in securely
- Protected routes for authenticated pages
- View and update a user profile
- Update login password
- Add shopping items with name, quantity, category, notes, and an automatic image
- View, edit, delete, search, sort, favourite, and share items
- Save data with json-server
- Manage shopping-list state with Redux
- Show feedback while actions are running and after they finish
- Work well on mobile, tablet, and desktop screens

## Design Direction / Moodboard

### Style

Clean, warm, friendly, and modern. The interface should feel simple and calm rather than crowded.

### Colour Palette

- Cream background: `#FAF9F6`
- Teal / dark green: `#007F5F`
- Soft grey text and borders: `#6B7280`
- Light green success feedback: `#DCFCE7`

### Typography

- Alkatra for the app name or major display headings
- A clear sans-serif font for forms, buttons, labels, and body text

### UI Inspiration

- Rounded cards
- Soft shadows
- Circular user avatar badges
- Teal icon buttons
- Clear spacing around forms and list cards
- Responsive layouts that stack neatly on smaller screens

## Step-by-Step Plan

1. Set up the React, TypeScript, Vite, and json-server project.
2. Create the JSON data structure for users and shopping items.
3. Set up Redux store, authentication slice, profile slice, and shopping-list slice.
4. Build registration and login pages with validation.
5. Add password hashing using bcryptjs.
6. Create protected and public routes.
7. Build the Home page and shopping-item card component.
8. Add CRUD operations using json-server and Redux.
9. Add categories, search, URL search parameters, sorting, and URL sort parameters.
10. Add automatic Pexels image lookup.
11. Add profile editing and password updating.
12. Add favourites and sharing.
13. Add loading, error, and success feedback.
14. Improve responsive styling for common device widths.
15. Run lint and build checks.
16. Document the project in the README.

## Pseudocode

### Register

```text

WHEN user submits registration form
  VALIDATE all fields
  VALIDATE email format
  VALIDATE password length
  HASH password with bcrypt
  SAVE new user to json-server
  STORE authenticated user in Redux
  NAVIGATE to Home page

. Login

WHEN user submits login form
  FIND user by email in json-server
  IF user does not exist
    SHOW invalid credentials message
  ELSE
    COMPARE entered password with stored bcrypt hash
    IF passwords match
      STORE authenticated user in Redux
      NAVIGATE to Home page
    ELSE
      SHOW invalid credentials message


. Add Item

WHEN user submits new item form
  VALIDATE item name
  SHOW finding-image loading state
  SEARCH Pexels using item name
  CREATE item with image URL, user ID, and date added
  SAVE item to json-server
  ADD item to Redux
  SHOW success message

. View, Search, and Sort

WHEN Home page loads
  GET items for the logged-in user from json-server
  STORE items in Redux

WHEN user searches
  UPDATE search keyword in URL
  FILTER items by name

WHEN user changes sort option
  UPDATE sort keyword in URL
  SORT items by name, category, or date added

. Update and Delete


WHEN user edits an item
  IF item name changed
    SEARCH Pexels for a new image
  ELSE
    KEEP existing image
  UPDATE item in json-server
  UPDATE item in Redux
  SHOW success message

WHEN user deletes an item
  DELETE item from json-server
  DELETE item from Redux
  SHOW success message

. Favourites and Sharing


WHEN user taps an item heart
  TOGGLE favourite status
  SAVE status to json-server
  UPDATE Redux

WHEN user taps Share
  CREATE readable text from items
  IF device supports native share
    OPEN share menu
  ELSE
    COPY list text to clipboard
  SHOW feedback message


  Moodboard


  https://www.figma.com/design/SUA2Ic
6rS1TOL0f6Kq3N7x/Shopping-
List?node-id=1-2&t=pvPZBF2HJTGojScn-
1

STEP-BY-STEP PLANNING

Phase 1: Project Setup

- Create React + TypeScript + Vite project
- Install required dependencies
- Set up project folder structure
- Configure Redux store
- Set up JSON Server

Phase 2: Authentication System

- Create Login Page component
- Create Registration Page component
- Implement password encryption/decryption
- Set up protected routes
- Create authentication Redux actions/reducers

Phase 3: User Profile

- Create Profile Page component
- Implement profile view/edit
- Add password update functionality
- Create profile Redux state management

Phase 4: Shopping List Core

- Create Shopping List main page
- Implement Add Shopping List form
- Create Shopping List card component
- Add Edit/Delete functionality
- Set up shopping list Redux state

Phase 5: Advanced Features

- Implement search with URL parameters
- Add sorting with URL parameters
- Create category/tag system
- Add image upload for items
- Implement sharing functionality

Phase 6: UI Polish

- Add responsive design
- Implement hover effects
- Add loading states
- Create notification system
- Add error handling

Phase 7: Testing & Documentation

- Test all features
- Fix bugs
- Write GitHub README
- Create commits for each feature


PROJECT STRUCTURE PLAN


