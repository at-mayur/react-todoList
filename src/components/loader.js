
import load from "../images/loading.gif";

// Loader component. Display when api is fetching todos.
function Loader(){
    return (
        <div>
            <img style={styles.loadImgStyle} src={load} alt="Loading..." />
        </div>
    );
}

const styles = {
    loadImgStyle: {
        display: "block",
        width: "60%",
        margin: "auto"
    }
};

export default Loader;