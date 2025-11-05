Live Link:-https://a-iimage-detector-react-ixna1jn3r-rulerds-projects.vercel.app/
<img width="1366" height="768" alt="Screenshot_2025-11-05_08_28_12" src="https://github.com/user-attachments/assets/f15f5384-736d-4d08-bc1d-919ae8397e40" />

## 🧠 Project Description

This project is an **AI-powered Image Object Detector** built using **React** and **TensorFlow’s COCO-SSD model**.
It allows users to **upload an image** (or use a default one) and detects common objects — like people, cars, dogs, bottles, etc. — directly in the browser using **machine learning**, without any backend server.

The app displays:

* The **detected object name**
* The **confidence score** (how sure the model is)
* A **progress bar** for easy visualization of confidence percentage

It runs **completely on the client side**, meaning **no API key or backend** is needed!

---

## ⚙️ Technologies Used

| Package                         | Purpose                                                 |
| ------------------------------- | ------------------------------------------------------- |
| **React**                       | Frontend framework for building the UI                  |
| **@tensorflow/tfjs**            | Core TensorFlow library to run AI models in the browser |
| **@tensorflow-models/coco-ssd** | Pretrained model for real-time object detection         |
| **Tailwind CSS** (optional)     | Styling and responsiveness                              |

---

## 📦 Installation Instructions

Follow these steps to get the app running locally:

### 1️⃣ Create a new React project

```bash
npx create-react-app ai-image-detector
cd ai-image-detector
```

### 2️⃣ Install dependencies

```bash
npm install @tensorflow/tfjs @tensorflow-models/coco-ssd
```

*(Optional if you use Tailwind CSS for styling)*

```bash
npm install -D tailwindcss
npx tailwindcss init
```

Then, add Tailwind setup in your `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 📁 File Structure

```
ai-image-detector/
├── src/
│   ├── App.js     ← main component (your code)
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

---

## 🚀 How to Run

In the project directory, run:

```bash
npm start
```

It will start the React development server.
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧩 How to Use

1. When the app opens, it loads a **default image** (a sample from Pexels).
   The model will automatically start detecting objects.

2. To try your own image:

   * Click **Upload Image**
   * Choose a photo from your system
   * The app will automatically run detection and show:

     * Object names
     * Confidence percentages
     * Animated progress bars

3. You’ll see detection results update instantly on the right side.

---

## 🧠 Example Output

For an image of a **dog with a person**, it might show:

```
Person – 98.45%
Dog – 92.30%
```

With progress bars showing each confidence visually.

---

## 🛠 Tips

* Try using **clear, bright images** for best detection accuracy.
* The model runs **in-browser**, so detection might take a second on slower devices.
* You can replace the default image URL in:

  ```js
  const [image, setImage] = useState("your-default-image-url-here");
  ```
* You can also adjust progress bar colors or styles using Tailwind classes.

---

