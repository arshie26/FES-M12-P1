// Shows one question, its four options, and the result once an option is picked.
export default function QuestionCard({ data, picked, onPick }) {
  const { question, options, answer } = data;

  return (
    <div className="card">
      <h2 className="question">{question}</h2>

      <div className="options">
        {options.map((option) => {
          let className = 'option';
          if (picked) {
            if (option === answer) className += ' correct';
            else if (option === picked) className += ' wrong';
          }

          return (
            <button
              key={option}
              className={className}
              disabled={Boolean(picked)}
              onClick={() => onPick(option)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {picked && (
        <p className="result">
          {picked === answer ? 'Correct!' : `Nope — the answer was ${answer}.`}
        </p>
      )}
    </div>
  );
}
