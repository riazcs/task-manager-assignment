**Task Management System:**<br/>
This is a Laravel-based task management system that allows you to perform CRUD operations on tasks, including basic authentication, task listing, creation, updating, and deletion.

**Setup Instructions:**<br>
Follow these steps to set up and run the task management system:
Clone Repository: Clone this repository to your local machine using the following command:
`git clone https://github.com/riazcs/task-manager-assignment` <br>
Navigate to Project Directory: Change your current directory to the cloned project folder:


`cd task-manager-assignment`<br>
Install Dependencies: Install the project dependencies using Composer:
`composer install`<br>
Set Up Environment File: Create a copy of the .env.example file and rename it to .env. Update the database connection details in the .env file according to your environment settings.

Generate Application Key: Generate the Laravel application key:<br>
`php artisan key:generate`<br>
Run Migrations: Run database migrations to create the necessary tables:

 .env file setup. Database name and other configuration set here.

`php artisan migrate`<br>
Seed Database (Optional): If you want to populate the database with sample data, run the database seeder:


`php artisan db:seed`
Start Development Server: Start the Laravel development server:

`php artisan serve`
Access the Application: Once the server is running, you can access the application in your web browser at http://localhost:8000.


`npm install`
Install node package manager vue 3 and others packages.

`npm run dev`
Access the Application: Once the frontend is running, you can access the application in your web browser at http://localhost:3000.

**Usage:**<br>
Authentication: The application includes passport.
task Management: After logging in, you can manage tasks by performing CRUD operations. tasks can be listed, created, updated, and deleted.

Folder Structure
app: Contains application-specific code.
database: Includes database migrations and seeders.
resources: Contains views, assets, and frontend components.
routes: Defines application routes.
License
This project is licensed under the MIT License. See the LICENSE file for details.

**Contributing**
Feel free to contribute to this project by submitting pull requests or reporting issues. Contributions are welcome!

**Credits**
This task management system is developed by Riazul Islam.

For more information, please contact riazul.cse.mbstu@gmail.com.# senior_laravel_backend_assessment
