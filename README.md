# React CRUD 👾
This project is a React CRUD about gaming products 🕹️

### Features 🚀
- JWT authentication 🔑
- Create new products with the following fields:
  - Product ID
  - Product status
  - Product category
  - Product name
  - Product stock
  - Product price
  - Product image
- Read the list of existing products on the home page 📜
- Update the information of an existing product 🛠️
- Delete an existing product 🗑️
- Delete multiple products at the same time 🗑️🗑️🗑️
- Product filtering by search bar 🔍
- Form validation ✅
- Pagination 📄
- Pagination bar 📈
- Success, loading and error messages 📨

### Technologies used 💻
- React ⚛️
- React router DOM with browser router 🌐
- Express REST API with:
 - Multer 📤
 - Oracledb 🗃️
- Oracle database express 21c 🐬
- SASS 💄
- JWT 🔒
- Jest and supertest 🧪

###Installation and setup 💻

1. Clone this repository: `git clone https://github.com/sebastian23182/crudreact.git`
2. Clone the REST API repository: `git clone https://github.com/sebastian23182/restapioracle-test.git`
3. Run the **script.sql** located in the REST API folder, make sure you are using a brand new testing database and that the database admin is set as **system** with password **123**. The database must be **xe** using SID (not **XEPDB1** or any pluggable database with service name). If you want, you can change the configuration in the **db.js file** located in the REST API folder to match your settings
3. Install dependencies in both projects `npm install`
4. In the console, move to the `src` folder in the REST API project folder and start with: `node index.js`
5. Start the React development server: `npm run start`
6. Open your browser and go to: `http://localhost:3002/login`

### Usage 🎮

1. Login with these credentials:
 - Email: Admincaja@gamers.com
 - Password: 123
2. Read the list of existing products on the home page
3. Create products by clicking on the **Crear** button
4. Update products by clicking on the update icon located to the right of every product
5. Delete products by clicking on the trash icon located to the right of every product
6. Delete multiple products by clicking on the left checkbox of every product and then clicking on the bottom button called **Borrar**
7. Filter products by writing in the search bar
8. Change page by clicking on the numbers of the pagination bar
9. Logout by clicking on the **turn on/off icon** located below the **GAMERS** logo

### License 📝
This project is licensed under the MIT License. See the `LICENSE` file for more information.

Thank you for your interest in this project!
