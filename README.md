# Next.js Product List with Category & Search Filtering

This project is a Next.js application that displays products fetched from an external API. Users can filter products by category and search for specific titles. The project utilizes Redux for state management and connects to the DummyJSON API.

## Features
- **Product Listing**: Displays a list of products, limited to 10 items at a time.
- **Category Filtering**: Allows users to filter products by selecting a category.
- **Search**: Provides a search bar to filter products by title.
- **Dynamic URL Updates**: Category and search state are reflected in the URL.
- **Responsive Layout**: Adjusts seamlessly to different screen sizes.

## Technologies Used
- **Next.js**: For building the application with server-side rendering capabilities.
- **Redux**: For managing the state of products and categories.
- **TypeScript**: Ensures strong type checking and enhanced development experience.
- **Tailwind CSS**: Provides a utility-first CSS framework for styling.
- **DummyJSON API**: A fake REST API for product and category data.

## How It Works
- **Initial Fetch**: Upon loading, the app fetches both categories and products from the DummyJSON API.
- **Category & Search**: Users can select categories or input search terms, which dynamically updates the product list. The changes are reflected in the URL, allowing direct access to filtered results.
- **Redux Integration**: All product and category data is managed through Redux, ensuring smooth state management across the app.

## Setup and Installation
1. Clone the repository.
2. Install the required dependencies.
3. Start the development server to view the app in action.

## API Information
The project connects to the DummyJSON API for fetching product and category data. It uses endpoints for both listing all products and fetching products by category.

## Customization
You can easily customize the project by adjusting the styling with Tailwind CSS or swapping the API for a different product data source.



## Contributions
Contributions are welcome. Feel free to submit issues or pull requests to improve the project!