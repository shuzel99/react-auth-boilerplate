import React, { useState, Fragment, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'


// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import CreateProfile from './components/CreateProfile'
import apiUrl from './apiConfig'

import axios from './apiConfig'

const App = () => {
//user for auth
  const [user, setUser] = useState(null)
  // current user's prof
  const [profile, setProfile] = useState({})
  const [msgAlerts, setMsgAlerts] = useState([])
  //const [currentProfile, setCurrentProfile] = useState(null)
 


  console.log('message alerts', msgAlerts)

  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}
	//GET A USER'S PROFILE 
	const getProfile = () =>{
		axios.get(apiUrl + `/profile/:_id`)
		.then((profile) => {
			console.log("oneeee user's profile", profile)
			setProfile(profile)
		})
		.catch((err) => console.log(err))
	}

	// //Get user from backend
	// const getProfile = () => {
	// 	if (user != null) {
	// 		fetch(apiUrl + `/profile/${user._id}`)
	// 		.then(profile => {
	// 			console.log("this is profile", profile)
	// 			return profile.json()
	// 		})
	// 		.then(profile => {
	// 			setCurrentProfile(profile[0])
	// 			return 'complete'
	// 		})
	// 		.catch(error => console.log(error))
	// 	}
	// }
	// //To run on login
	// useEffect(() => {
	// 	getProfile()
	// }, [getProfile])

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} getProfile={getProfile} />} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/create-profile'
						element={<CreateProfile user={user} setProfile={setProfile}/>}
					/>


          <Route
            path='/sign-out'
            element={
              <RequireAuth user={user}>
                <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
              </RequireAuth>
            }
          />
          <Route
            path='/change-password'
            element={
              <RequireAuth user={user}>
                <ChangePassword msgAlert={msgAlert} user={user} />
              </RequireAuth>}
          />
		  </Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		)
}

export default App
