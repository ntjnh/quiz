import React from "react";
import ReactDOM from "react-dom";
import Questions from "./questions";

class App extends React.Component {
    render() {
        return (
            <div>
                <h1 id="title">Quiz</h1>

                <Questions />
                {/* Submit button? */}
                {/* Results modal */}
            </div>
        );
    }
}

if (typeof window !== 'undefined') {
    ReactDOM.render(<App />, document.getElementById("root"));
}