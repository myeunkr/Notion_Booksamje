import { StartScreen } from './screens/StartScreen'
import { QuestionScreen } from './screens/QuestionScreen'
import { TieBreakScreen } from './screens/TieBreakScreen'
import { ResultScreen } from './screens/ResultScreen'
import { QUESTIONS } from './data/questions'
import { calculateScores, getTopTypes, resolveFromAnswers } from './logic/scoring'
import { useTestState } from './state/useTestState'

function App() {
  const {
    state,
    showStart,
    hasProgress,
    goToStart,
    resume,
    startNewTest,
    answerCurrent,
    goToPrevious,
    resolveTie,
    resetTest,
  } = useTestState()

  if (showStart) {
    return (
      <div className="app-shell">
        <StartScreen
          hasProgress={hasProgress}
          onStart={startNewTest}
          onResume={resume}
          onRestart={startNewTest}
        />
      </div>
    )
  }

  if (state.screen === 'question') {
    const question = QUESTIONS[state.currentIndex]
    return (
      <div className="app-shell">
        <QuestionScreen
          key={question.id}
          question={question}
          order={state.order[state.currentIndex]}
          selectedType={state.answers[state.currentIndex]}
          currentNumber={state.currentIndex + 1}
          totalQuestions={QUESTIONS.length}
          canGoPrev={state.currentIndex > 0}
          onSelect={answerCurrent}
          onPrev={goToPrevious}
          onLogoClick={goToStart}
        />
      </div>
    )
  }

  if (state.screen === 'tie') {
    const tiedTypes = getTopTypes(calculateScores(state.answers))
    return (
      <div className="app-shell">
        <TieBreakScreen tiedTypes={tiedTypes} onResolve={resolveTie} onBack={goToPrevious} />
      </div>
    )
  }

  const result = resolveFromAnswers(state.answers, state.tieSelection)
  if (!result) {
    // storage.ts가 저장 시점에 정합성을 검증하므로 정상 흐름에서는 도달하지 않는다.
    return null
  }

  return (
    <div className="app-shell">
      <ResultScreen result={result} onRestart={resetTest} />
    </div>
  )
}

export default App
