# Project Description:

The goal of this project is to create a web page that displays a list of products using the provided API. Each product entry should include its ID, name, price, and brand for better user understanding and interaction.

# Requirements:

1. Displaying Products: The page should showcase products in groups of 50, allowing users to navigate through pages using pagination controls.
Pagination controls should enable movement in both forward and backward directions.
Filtering Options:

2. Implement functionality to filter products based on the provided API's capabilities for filtering by name, price, and brand. Users should be able to input filter criteria to refine the displayed product list.

3. Handling Duplicate IDs: If the API returns duplicate IDs for products, consider them as a single product and display only the first occurrence. Even if other fields differ for duplicates, prioritize showing the details of the first occurrence.

4. Error Handling: Handle API errors gracefully, displaying the error identifier in the console if available.
Retry the request in case of an error, ensuring robust communication with the API.

5. Technology Choices: The project can be implemented using either React or native JavaScript, depending on the developer's preference and expertise.
Evaluation Criteria:
