# Customization Guidelines

This guide is designed to help you (the client or site owner) update your Academic Portfolio website. The project has been built in a modular way so that **updating your data does not require advanced coding skills**.

---

## 1. How to Update Your Content (Data)

Almost all the text content shown on the website (your name, bio, experience, publications, etc.) is stored in dedicated "data" files. You do not need to touch the complex UI code to change your information.

All data files are located in the `src/data/` folder. They are simple TypeScript (`.ts`) files containing structured information. 

### `src/data/personal_info.ts`
This file controls the main header, Hero section, and Contact information.
- **Fields to change**:
  - `name`, `title`, `description`: Shown at the top of the site.
  - `email`, `phone`, `officeLocation`, `officeHours`: Shown in the Contact section.
  - `linkedin`, `researchGate`, `googleScholar`: Links to your social profiles.
  - `photo`: The path to your profile picture (place your image in the `public/photo/` folder and link it here, e.g., `"/photo/my_picture.jpg"`).
  - `cv`: The path to your downloadable CV PDF.

### `src/data/experience_data.ts`
This file holds your employment and research experience.
- It contains a list of objects. To add a new experience, simply copy an existing block (from `{` to `},`) and change the details:
  - `id`: Keep it unique (e.g., `"exp-1"`).
  - `title`, `company`, `location`, `period`.
  - `description`: An array of strings. Each string will become a bullet point on the website.

### `src/data/education_data.ts`
Similar to experience, this holds your educational background.
- Change `degree`, `institution`, `period`, `location`, and optionally add an `achievements` array for bullet points under the degree.

### `src/data/publications_data.ts`
This file handles your publications. It is categorized to help you manage different types of papers.
- Change fields like `title`, `authors`, `venue` (the journal or conference name), `year`, and `doi`.
- The `link` field can direct users to the actual paper.

### `src/data/conferences_data.ts` & `src/data/journey_data.ts`
These files work exactly the same way. Update the text strings, dates, and locations. 

> **Tip:** Make sure to preserve all quotation marks (`" "`), commas (`,`), and brackets (`{ }`, `[ ]`). If the website breaks after an edit, you likely missed a comma at the end of a line!

---

## 2. How to Change the Design & Colors

The website uses **Tailwind CSS** for styling. The core color themes are defined globally, making it easy to swap out the main brand colors.

### Changing the Color Palette
1. Open the `src/index.css` file.
2. Under the `@layer theme` section, you will see a list of CSS variables defining colors:
   ```css
   --color-emerald-600: oklch(.596 .145 163.225);
   ```
   The site heavily utilizes standard Tailwind colors (like `emerald`, `green`, `teal`, `gray`). 
3. If you want to change the primary accent color from the default to another color, you can find and replace the Tailwind color classes in the component files. For example, replacing `text-emerald-600` with `text-blue-600` across your components.
4. **Dark/Light Mode**: The site relies on the `next-themes` setup. The background and foreground colors are typically tied to standard variables like `--background` and `--foreground`. 

### Changing Fonts
The fonts are also defined in `src/index.css`:
```css
--font-sans: ...
```
To change fonts, you can import a Google Font in your `index.html` file (inside the `<head>` tag) and then update the `--font-sans` variable in `index.css` to use your new font name.

---

## 3. How to Change the Layout

Layout changes require a little more familiarity with React and Tailwind CSS. The user interface is composed of modular components located in the `src/components/` folder.

### Rearranging Sections on the Page
If you want to move the "Education" section above the "Experience" section:
1. Open `src/App.tsx` (or `src/main.tsx` if routing is done there).
2. You will see a list of components being rendered:
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

### Adding a New Section
1. Create a new file in `src/components/`, for example, `Awards.tsx` by copying an existing component's structure.
2. Create a data file for it in `src/data/awards_data.ts`.
3. Import your data into `Awards.tsx` and build the layout.
4. Finally, import `<Awards />` into `src/App.tsx` and place it where you want it to appear on the page.

---

## 4. Deploying Your Changes

Once you are satisfied with your local changes (testing via `npm run dev`):
1. Run `npm run build` in your terminal.
2. This will generate a `dist` folder.
3. Upload the contents of the `dist` folder to your web host (e.g., cPanel, GitHub Pages, Vercel, Netlify) to make your updates live.
