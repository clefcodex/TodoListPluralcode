import { Link } from 'react-router-dom'

const Navbar = () => {
    return(
        <header>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Task Manager</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </head>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <Link to="/"><a class="navbar-brand">Task Manager</a></Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><Link to="/login"><a class="nav-link">Login</a></Link></li>
                            <li class="nav-item"><Link to="/signup"><a class="nav-link">Signup</a></Link></li>
                        </ul>
                    </div>
                </div>
            </nav> 
        </header>
    )
}


export default Navbar;








