// // import { Navigate } from "react-router-dom";
// // import { useEffect,useState } from "react";
// // import axios from "axios";
// // const ProtectedRouteStudent = ({ children }) => {
// //   const [profession,setProfession]=useState("");
// //   useEffect( ()=>{
// //     async function fetchData(){
// //     try {
// //       const headers = {
// //         "Content-Type": "application/json",
// //         "x-auth-token": localStorage.getItem("token"),
// //       };
// //       let res=await axios.get('http://localhost:5000/api/auth/protectroute',
// //       {
// //         headers: headers,
// //       });
// //       // console.log(res);
// //       if(res){
// //         console.log(res.data.profession);
// //         setProfession(res.data.profession);
// //         console.log("profession is"+profession);
// //       }
// //     } catch (err) {
// //       return;
// //     }
// //   }fetchData();
// //   },[])
// //   const fetchUser = async () => {
// //     try {
// //         if (profession !== 'student') {
// //           localStorage.removeItem("token");
// //           window.location.reload();
// //           return <Navigate to="/login" replace />;
// //         } else {
// //           return true;
// //         }
      
// //     } catch (err) {
// //       window.alert(err.data.msg);
// //       localStorage.removeItem("token");
// //       window.location.reload();
// //       return <Navigate to="/login" replace />;
// //     }
// //   };
// //   if (!localStorage.token) {
// //     window.alert("Token is not there");
// //     return <Navigate to="/login" replace />;
// //   } else if (
// //     localStorage.token &&
// //     profession === "student"
// //   ) {
// //     console.log("Token is there and profession is there");
// //     const x=fetchUser();
// //     window.alert("fuck this shit");
// //     if(x)
// //         return children;
// //   } else return <Navigate to="/login" replace />;
// // };
// // export default ProtectedRouteStudent;
// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const ProtectedRouteStudent = ({ children }) => {
//   const [profession, setProfession] = useState({bool:false});
//   const[isValid,setValid]=useState(false);

//   // useEffect(() => {
//     async function fetchData() {
//       try {
//         const headers = {
//           "Content-Type": "application/json",
//           "x-auth-token": localStorage.getItem("token"),
//         };
//         let res = await axios.get('http://localhost:5000/api/auth/protectroute', {
//           headers: headers,
//         });
//         if (res) {
//           // console.log(res.data.profession);
//           // setProfession(res.data.profession.toString());
//           if(res.data.profession.toString()==='student'){
//               setProfession(...{bool:true})
//               console.log(profession.bool)
//           }
//           // console.log(profession)
//         }
//       } catch (err) {
//         console.error(err);
//       }
//       // getProfession();
//     }
//     // const getProfession=async()=>{
//     //   if(profession)
//     //     return profession;
//     // }
//     fetchData();
//   // }, []);

  
//    useEffect(()=>{
//     if (!localStorage.token) {
//       // return <Navigate to="/login" replace />;
//       setValid(false);
//     } else if (localStorage.token && profession.bool) {
//         setValid(true);
//     } else {
//       console.log(isValid+" "+profession)
//       // localStorage.removeItem("token");
//       // window.location.reload();
//       // return <Navigate to="/login" replace />;
//       setValid(false);

//     }
//    },[])
//    if(isValid)
//     return children;
//    else
//    return <Navigate to="/login" replace />;

//   };


// export default ProtectedRouteStudent;
import { Navigate } from "react-router-dom";
import axios from "axios";
const ProtectedRouteStudent = ({ children }) => {
  const fetchUser = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      };
      let res = await axios.get(
        "http://localhost:5000/api/auth/protectroute",
        {
          headers: headers,
        }
      );
      // console.log(res);
      if (res) {
        if (res.data.profession !== localStorage.getItem("profession")) {
          localStorage.removeItem("token");
          localStorage.removeItem("profession");
          window.location.reload();
          return <Navigate to="/login" replace />;
        } else {
          return true;
        }
      }
    } catch (err) {
      window.alert(err.data.msg);
      localStorage.removeItem("token");
      localStorage.removeItem("profession");
      window.location.reload();
      return <Navigate to="/login" replace />;
    }
  };
  if (!localStorage.token) {
    return <Navigate to="/login" replace />;
  } else if (
    localStorage.token &&
    localStorage.getItem("profession") === "student"
  ) {
    if(fetchUser())
        return children;
  } else return <Navigate to="/login" replace />;
};
export default ProtectedRouteStudent;
