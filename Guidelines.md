# Customization & Management Guidelines

This guide is designed to help you (the client or site owner) update and manage your Academic Portfolio website. The project is equipped with a secure, graphical Admin Dashboard, meaning **updating your content does not require any coding skills**.

---

## 1. Managing Your Content via the Dashboard

Unlike static templates, this portfolio is powered by a live database (Firebase Firestore). You can manage all text, experiences, publications, and skills directly from a secure web interface.

### Initial Setup (One-Time)
Before you can manage your site, you must claim ownership:
1. Navigate to `/admin-setup` (e.g., `http://localhost:5173/admin-setup`).
2. Enter your email and a secure password.
3. Click **Complete Setup**. 
*(Note: As a security measure, once this is done, the setup page locks itself permanently. No one else can run this setup again.)*

### Accessing the Dashboard
1. Navigate to `/login` (e.g., `http://localhost:5173/login`).
2. Enter the credentials you established during setup.
3. You will be redirected to the secure **Admin Dashboard**.

### Updating Data
Inside the dashboard, you will find a sidebar with different sections corresponding to your public portfolio:
- **Personal Info**: Controls the main header, Hero section text, and Contact information links. You can also paste direct image URLs here for your profile picture and CV download.
- **Experience, Education, Projects**: Dynamic lists where you can click "Add Item" to add new timeline entries. You can also edit or delete existing entries.
- **Skills & Research Interests**: You can use the built-in dropdown menu to select from curated, professional icons (like engineering or aerospace symbols) to visually represent your skills.
- **Saving**: Whenever you click "Save" on any form, the data is instantly synced to your live database. If you navigate to your public portfolio, you will see the changes instantly.

---

## 2. How to Change the Design & Colors

The website uses **Tailwind CSS** for styling. The core color themes are defined globally, making it easy to swap out the main brand colors if you prefer something other than the default emerald/teal.

### Changing the Color Palette
1. Open the `src/index.css` file in a code editor.
2. Under the `@layer theme` section, you will see a list of CSS variables defining colors:
   ```css
   --color-emerald-600: oklch(.596 .145 163.225);
   ```
   The site heavily utilizes standard Tailwind colors. 
3. If you want to change the primary accent color from the default, you can find and replace the Tailwind color classes in the component files (e.g., replacing `text-primary` with `text-blue-600`).

### Changing Fonts
The fonts are also defined in `src/index.css`:
```css
--font-sans: ...
```
To change fonts, you can import a Google Font in your `index.html` file (inside the `<head>` tag) and then update the `--font-sans` variable in `index.css` to use your new font name.

---

## 3. How to Change the Layout

Layout changes require a little more familiarity with React and Tailwind CSS. The public user interface is composed of modular components located in the `src/components/` folder.

### Rearranging Sections on the Page
If you want to move the "Education" section above the "Experience" section:
1. Open `src/pages/Portfolio.tsx`.
2. You will see a list of components being rendered inside the `<main>` tag:
   ```tsx
   <Hero />
   <Experience />
   <Education />
   <Publications />
   ```
3. Simply change the order of these tags. The layout will update immediately.

### Editing Specific Sections
If you want to change how a specific section looks (e.g., making the Hero image larger or changing text alignment):
1. Go to `src/components/` and open the relevant file (e.g., `Hero.tsx`).
2. Inside the file, you will find HTML-like code (JSX) with `className="..."` attributes. These are Tailwind CSS classes.
3. You can modify these classes to change the layout. For example, changing `flex-col` to `flex-row`, or adjusting spacing like `mt-4` (margin-top) or `p-6` (padding). 
4. Refer to the [Tailwind CSS Documentation](https://tailwindcss.com/docs) for a full list of available utility classes.

---

## 4. Deploying Your Changes

Once you are satisfied with your local setup:
1. Run `npm run build` in your terminal to generate the optimized frontend code.
2. This will generate a `build` folder.
3. You can deploy this `build` folder to any static hosting provider. We highly recommend **Firebase Hosting** since your backend is already running on Firebase:
   ```bash
   firebase init hosting
   firebase deploy --only hosting
   ```
