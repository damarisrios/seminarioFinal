import { Route, Routes } from "react-router-dom";
import UserTypeSelection from "./components/userType";
import LoginRegistrationForm from "./components/login";
import UserMeasures from "./components/userMeasures";
import NutritionistFile from "./components/nutriFile";
import EditData from "./components/editData";
import RegistrationForm from "./components/register";
import AddContent from "./components/addContent";
import NutritionistDashboard from "./components/nutriDashboard";
import UserDashboard from "./components/userDashboard";
import EditMeasures from "./components/changeUsername";
import PasswordChange from "./components/changePassword";
import ContentViewN from "./components/contentViewNutri";
import ContentViewU from "./components/contentViewUser";
import HomePage from "./components/home";

const RoutesComponent = () => {
    return ( <Routes>
        <Route path="/register" element={<RegistrationForm/>}/>
        <Route path="/login" element={<LoginRegistrationForm/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/userType" element={<UserTypeSelection/>}/>
        <Route path="/userMeasures" element={<UserMeasures/>}/>
        <Route path="/nutriFile" element={<NutritionistFile/>}/>
        <Route path="/editData" element={<EditData/>}/>
        <Route path="/addContent" element={<AddContent/>}/>
        <Route path="/dashboardN" element={<NutritionistDashboard/>}/>
        <Route path="/dashboardU" element={<UserDashboard/>}/>
        <Route path="/editMeasures" element={<EditMeasures/>}/>
        <Route path="/changePassword" element={<PasswordChange/>}/>
        <Route path="/contentViewN" element={<ContentViewN/>}/>
        <Route path="/contentViewU" element={<ContentViewU/>}/>
        <Route path="/home" element={<HomePage/>}/>
    </Routes> );
}
 
export default RoutesComponent;