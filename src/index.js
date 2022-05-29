import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router , 
    Routes, 
    Route, 
    Navigate,
    Link,
    Outlet,
    useParams,
    NavLink,
    useNavigate,
    useLocation
} from 'react-router-dom';

ReactDOM.render(
<Router> 
    <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/myapps" element={<Navigate replace to="/learn " />} /> 
       
        <Route path="/learn" element={<Learn/>} >
            <Route path='courses' element={<Courses/>}>
            <Route path=':courseid' element={<CoureseId/>}/>
            </Route>
            <Route path='Bundles' element={<Bundles/>}/>
        </Route>
        <Route path='/dashboard' element={<Dashboard/>}/>

    </Routes>
</Router>
, document.getElementById('root'));

function Home(){
    return(
        <div>
            <h1>Home Route!</h1>
        </div>        
    );
}

function Learn(){
    return(
        <div>
            <h1>Learn!</h1>
            <h4>All Courses are Listed Here</h4>
            <Link to="/learn/courses">Course</Link>{" |  "}
            <Link to="/learn/bundles">bundle</Link>
            <Outlet/>
        </div>        
    );
}

function Courses(){
    const courseList = ["React", "Angular" ,"Vue", "Nodejs"];
    const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)];
    return(
        <div>
            <h1>Courese List</h1>
            <h4> Courese Card</h4>

                <p>More test</p>
                <NavLink  
                style={({isActive})=> {
                    return{
                        backgroundColor: isActive? "yellow" : "red",
                    };
                }}
                to={`/learn/courses/${randomCourseName}`} > 
                    {randomCourseName} 
                </NavLink>
                  
                <NavLink className="btn btn-light" to={`/learn/courses/tests`}> 
                    tests
                </NavLink>

            <Outlet/>
        </div>        
    );
}

function Bundles(){
    return(
        <div>
            <h1>Bundle List</h1>
            <h4> Bundle Card</h4>
        </div>        
    );
}
function CoureseId(){
    const navigate = useNavigate();
    const {courseid} = useParams();
    return(
        <div>
            <h1>URL Params is : {courseid}</h1>
            <button 
            onClick={()=> {
                navigate('/dashboard', {state:courseid})
            }}
            className='btn btn-warning'>Price</button>
        </div>        
    );
}
function Dashboard(){
   const location = useLocation();
    return(
        <div>
            <h1>info that i got here is {location.state}</h1>
            
        </div>        
    );
}

registerServiceWorker();
