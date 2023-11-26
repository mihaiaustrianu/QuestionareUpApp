import QuizMenu from "../../components/quizes/QuizMenu"

const QuizPage = () => {
  return (
    <div style={styles.pageContainer}>
      <QuizMenu />
    </div>
  )
}

const styles = {
  pageContainer: {
    display: "flex",
    marginTop: "20px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px", // Adjust the value as needed for left and right margins
  },
}

export default QuizPage
