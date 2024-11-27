
# **MUJbazaar**

<div align="center">
  <a href="https://mujbazaar.vercel.app/">
      Demo
  </a>
</div>

---

## Table of Contents
- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to Use](#how-to-use)

---

## Overview
**MUJbazaar** is a web application built using React, Tailwind CSS, and Firebase. It serves as a digital marketplace for students and locals to **buy, sell, or rent items** within the college community. The platform enables users to post listings, browse categories, and connect with others securely and conveniently.

This project was inspired by real-world challenges faced by students in accessing affordable resources, such as books, electronics, and furniture, and is tailored to provide an efficient and user-friendly solution.

### Built With
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- [DaisyUI](https://daisyui.com/) - Tailwind-based component library.
- [Formik](https://formik.org/) - Forms and validation.
- [Yup](https://github.com/jquense/yup) - Schema-based validation.
- [Firebase](https://firebase.google.com/) - Backend for authentication, database, and storage.
- [React Router v6](https://reactrouter.com/) - Routing library.
- [Swiper](https://swiperjs.com/react/) - Carousel component.
- [React Dropzone](https://react-dropzone.js.org/) - File upload.
- [Geocoding API](https://us1.locationiq.com/) - For location-based services.

---

## Features
- **User Authentication**:
  - Login and registration through email or Google account.
- **Listing Management**:
  - Users can create, edit, and delete listings.
  - Upload images and details for items (e.g., price, category, description).
- **Search and Filter**:
  - Filter listings based on:
    - Price (Low to High, High to Low).
    - Category (Books, Electronics, Furniture, etc.).
    - Item condition.
- **Wishlist**:
  - Save favorite listings for quick access.
- **Messages**:
  - Send messages to listing owners.
  - View received messages.
- **Real-Time Updates**:
  - Listings and messages are updated in real time using Firebase.
- **Geolocation**:
  - Integration of Geocoding API for location-based item searches.

---

## How to Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

### Steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/MUJbazaar
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Firebase**:
   - Create a `firebase.config.js` file inside the `src` folder.
   - Export Firebase services (Firestore, Storage, Auth) as `db`, `storage`, and `auth`.

4. **Run the Application**:
   ```bash
   npm run dev
   ```

5. **Access the Website**:
   Open your browser and navigate to `http://localhost:3000`.

---

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
