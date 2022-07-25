module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        1600: "1600px",
        400: "400px",
        450: "450px",
        210: "210px",
        550: "550px",
        260: "260px",
        650: "650px",
      },
      height: {
        600: "600px",
        280: "280px",
        900: "900px",
        458: "458px",
      },
      top: {
        " 50%": "50%",
      },
      backgroundColor: {
        primary: "#F1F1F2",
        blur: "#030303",
      },
      colors: {
        "primary-dark-200": "#45464f",
        "primary-dark-400": "#161823",
        "primary-dark-700": "#12131c",
        "secondary-dark-200": "#f747ac",
        "secondary-dark-400": "#f51997",
        "secondary-dark-700": "#c41479",
        "primary-light-200": "#cccccc",
        "primary-light-400": "#ffffff",
        "primary-light-700": "#666666",
        "secondary-light-200": "#f747ac",
        "secondary-light-400": "#f51997",
        "secondary-light-700": "#c41479",
      },
      height: {
        "88vh": "88vh",
      },
      backgroundImage: {
        "blurred-img":
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsaaJ7s4lqcBF4IDROVPzrlL5fexcwRmDlnuEYQenWTt1DejFY5kmYDref2a0Hp2eE4aw&usqp=CAU')",
      },
    },
  },
  plugins: [],
};
