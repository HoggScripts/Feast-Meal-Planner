# React + Vite

## Feast Frontend

The Feast frontend is a React-based web application that allows users to plan meals, manage recipes, and schedule events on their Google Calendar. It provides an intuitive user interface for creating, editing, and scheduling recipes, as well as generating shopping lists based on the selected meals.

### Key Features

#### 1. Meal Planning:

Plan your weekly meals by scheduling recipes with custom meal times.

![Meal Planning](src/assets/draganddrop.gif)

#### 2. Recipe Management:

Add, edit, and manage your recipes, including detailed ingredients and instructions.

![Recipe Management](src/assets/recipecreation.gif)

#### 3. Shopping List Generation and Google Calendar Integration:

Automatically generate shopping lists based on scheduled meals. Seamlessly schedule your meals on Google Calendar with calculated start and end times.

![Shopping List](src/assets/shoppinglist.gif)

#### 4. View Weekly Nutritional Information in Graphs:

Track your weekly nutritional intake with dynamic visualizations, helping you stay informed about your diet's nutrient distribution.

![Weekly Nutritional Graphs](src/assets/graphs.gif)

#### 5. Currency Conversion:

Convert ingredient costs into different currencies using real-time exchange rates.

![Currency Conversion](src/assets/currency.gif)

### Technologies Used

- **React:** For building the user interface.
- **Zustand:** State management for handling recipe and meal plan data.
- **NextUI:** For UI components and styling.
- **TanStack React Query:** For data fetching and asynchronous state management.
- **Date-fns:** For date manipulation and formatting.
- **Spoonacular API:** For fetching detailed ingredient information and estimated costs.
