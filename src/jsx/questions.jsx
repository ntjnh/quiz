import React from "react";

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            questions: []
        };
    }

    componentDidMount() {
        fetch("https://opentdb.com/api.php?amount=20&type=multiple")
        .then(res => res.json())
        .then(result => {
            this.setState({
                isLoaded: true,
                questions: result.results
            });
        },
        error => {
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    render() {
        const { error, isLoaded, questions } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if(!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {questions.map((question, i) => (
                        <div className="question" key={"question-" + (i + 1)}>
                            <h3 className="question-text">{question.question}</h3>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default Questions;