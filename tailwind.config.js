/** @type {import('tailwindcss').Config} */

module.exports={
  content:['./Views/**/*.{html,htm,ejs,js,jsx,tsx,ts}','./Views/*.{html,htm,ejs,js,jsx,tsx,ts}'],
  theme:
    {
      extend:{},
    },
  plugins:
    [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
    ],
};