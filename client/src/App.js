import './App.css';
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Responses from './components/responses';
import Entrepreneur_Dashboard from './components/entrepreneur_dashboard';
import Viewproblem from './components/viewproblem';
import Post_problem from './components/post_problem';
import Investment_request from './components/investment_request';
import Investment_status from './components/investment_status';
import Entrepreneurprofile from './components/entrepreneur_profile';
import Investor_dashboard from './components/investor_dashboard';
import Investments from './components/investments';
import InvestmentsAccepted from './components/investments_accepted';
import InvestorProfile from './components/investor_profile';
import StudentDashboard from './components/student_dashboard';
import Viewproblemstudent from './components/viewproblemstudent';
import PostIdea from './components/post';
import YourIdeas from './components/yourIdeas';
import JustViewIdea from './components/justviewidea';
import StudentProfile from './components/student_profile';
import ProtectedRouteStudent from './components/ProtectedStudent';
import ProtectedRouteInvestor from './components/ProtectedInvestor';
import ProtectedRouteEntrepreneur from './components/ProtectedEntrepreneur';
import Unprotected from './components/Unprotected';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
              <Unprotected><Landing/></Unprotected> 
          } />
          <Route path='/login' element={
            <Unprotected><Login/></Unprotected>
  
          }/>
          <Route path='/register' element={
            <Unprotected><Register/></Unprotected>
          }></Route>
          <Route path='/Entrepreneur_dashboard' element={
            <ProtectedRouteEntrepreneur>
              <Entrepreneur_Dashboard/>
            </ProtectedRouteEntrepreneur>
          }></Route>
          <Route path='/responses/:id' element={
            <ProtectedRouteEntrepreneur>
              <Responses/>
            </ProtectedRouteEntrepreneur>
          }></Route>
          <Route path='/viewproblem/:id' element={
          <ProtectedRouteEntrepreneur>
            <Viewproblem/>
          </ProtectedRouteEntrepreneur>
          }></Route>
          <Route path='/post_problem' element ={
          <ProtectedRouteEntrepreneur>
            <Post_problem/>
          </ProtectedRouteEntrepreneur>
          }></Route>
          <Route path='/investment_request' element ={
          <ProtectedRouteEntrepreneur>
            <Investment_request/>
          </ProtectedRouteEntrepreneur>
          }></Route>
          <Route path='/investment_status' element ={
          <ProtectedRouteEntrepreneur>
            <Investment_status/>
          </ProtectedRouteEntrepreneur>
          }></Route>
          <Route path='/entrepreneur_profile' element ={
          <ProtectedRouteEntrepreneur>
            <Entrepreneurprofile/>
          </ProtectedRouteEntrepreneur>
          }></Route>


          <Route path='/investor_dashboard' element ={
            <ProtectedRouteInvestor>
              <Investor_dashboard/>
            </ProtectedRouteInvestor>
          }></Route>
          <Route path='/investments/:id' element={
            <ProtectedRouteInvestor>
              <Investments/>
            </ProtectedRouteInvestor>
          }></Route>
          <Route path='/investments_accepted' element={
            <ProtectedRouteInvestor>
              <InvestmentsAccepted/>
            </ProtectedRouteInvestor>
          }></Route>
          <Route path='/investor_profile' element={
            <ProtectedRouteInvestor>
              <InvestorProfile/>
            </ProtectedRouteInvestor>
          }></Route>
          

          <Route path='/student_dashboard' element={
            <ProtectedRouteStudent>
              <StudentDashboard/>
          </ProtectedRouteStudent>
          }></Route>
          <Route path='/viewproblemstudent/:id' element={
            <ProtectedRouteStudent>
            <Viewproblemstudent/>
        </ProtectedRouteStudent>
          }></Route>
          <Route path='/post/:id' element ={
            <ProtectedRouteStudent>
              <PostIdea/>
            </ProtectedRouteStudent>
          }></Route>
          <Route path='/yourIdeas' element ={
            <ProtectedRouteStudent>
            <YourIdeas/>
          </ProtectedRouteStudent>
          }></Route>
          <Route path='/justviewidea/:id' element ={
            <ProtectedRouteStudent>
            <JustViewIdea/>
          </ProtectedRouteStudent>
          }></Route>
          <Route path='/student_profile' element ={
            <ProtectedRouteStudent>
            <StudentProfile/>
          </ProtectedRouteStudent>
          }></Route>    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
