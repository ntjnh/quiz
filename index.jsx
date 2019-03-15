import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    render() {
        return (
            <div>
                <h1 id="title">Quiz</h1>

                {/* Questions Component */}
                {/* Submit button? */}
                {/* Results modal */}
            </div>
        );
    }
}

if (typeof window !== 'undefined') {
    ReactDOM.render(<App />, document.getElementById("root"));
}