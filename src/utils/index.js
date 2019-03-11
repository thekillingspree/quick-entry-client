export const API_URL = "https://quick-entry.herokuapp.com/api";

export const authMapStateToProps = state => (
    {
        error: state.errors.message
    }
)