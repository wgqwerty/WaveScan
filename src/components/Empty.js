import "./Empty.css";
import { Link } from 'react-router-dom';

function Empty() {

    return (
        <div className="vertical-center">
            <div class="msc-blank-icon">⚠</div>
            <div class="msc-blank-title">
                No scanners available
            </div>
            <div class="msc-blank-desc">
                You may go back to the scanning page
            </div>
            <Link to="..">
                <button>Home</button>
            </Link>
        </div>
    );
  }
  
  

  export default Empty;