## Community Marketplace App
---
Project Overview
This is a static Home Screen built using React Native and Expo. It serves as the visual foundation for a marketplace app, featuring product listings with images, pricing, and categories.

Project Structure

src/components/Header.js: The top navigation bar.

src/components/ProductCard.js: The reusable UI for each product item.

src/screens/HomeScreen.js: The main screen that holds the product list.

App.js: The entry point of the application.

Key Features
1. Clean and modern product card design.
2. Efficient scrolling using the FlatList component.
3. Organized folder structure for better code management.
4. Responsive layout using Flexbox.
### Layout Decisions
Used a modular component approach to make the code easy to maintain.


Implemented FlatList instead of ScrollView to prepare for larger amounts of data in the future.

Applied shadows and rounded corners to the cards to create a professional look.

Used a green color for prices to make them stand out to the user.
```How to Run
Install dependencies: npm install
Start the project: npx expo start
Open in Expo Go on your mobile device.
