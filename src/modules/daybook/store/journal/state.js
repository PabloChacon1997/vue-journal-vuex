export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      text:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima delectus doloribus quidem, odio at impedit voluptates consectetur culpa reiciendis tempora facilis consequatur, ipsum suscipit distinctio expedita fuga, harum vero a.",
      picture: null,
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      text:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima delectus doloribus quidem, odio at impedit voluptates consectetur culpa reiciendis tempora facilis consequatur, ipsum suscipit distinctio expedita fuga, harum vero a.",
      picture: null,
    },
    {
      id: new Date().getTime() + 2000,
      date: new Date().toDateString(),
      text:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima delectus doloribus quidem, odio at impedit voluptates consectetur culpa reiciendis tempora facilis consequatur, ipsum suscipit distinctio expedita fuga, harum vero a.",
      picture: null,
    },
  ],
})
