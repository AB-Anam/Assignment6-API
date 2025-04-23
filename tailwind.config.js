/** @type {import('tailwindcss').Config} */
export default {
      content: ["./src/**/*.{html,js}",
         "./index.html",
         "./src/**/*.{js,ts,jsx,tsx}"
      ],
        theme: {
          extend: {},
        },
        plugins: [],
      }

      module.exports = {
        //...
        daisyui: {
          themes: ["light", "dark", "cupcake"],
        },
      }