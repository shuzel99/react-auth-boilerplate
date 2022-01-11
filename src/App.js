// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
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
import apiUrl from './apiConfig'
import Profile from './components/Profile'

const App = () => {
  const [profile, setProfile] = useState([])
  const [chat, setChat] = useState([])
  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
  const [currentProfile, setCurrentProfile] = useState(null)

  console.log('user in app', user)
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
	//GET USER PROF FROM DB
	const getProfile = () => {
		if (user != null) {
			fetch(apiUrl + `/profiles/${user._id}`)
			.then(profile => {
				return profile.json()
			})
			.then(profile =>{
				setCurrentProfile(profile[0])
				return 'complete'
			})
			.catch(error => console.log(error))
		}
	}

	const getChats = () => {
		if (user != null) {
			fetch(apiUrl + '/jobs/user', {
				headers : {
					'Authorization': 'Bearer' + user.token
				}
			})
			.then(chats => {
				return chats.json()
			})
			.then(chats => {
				setChat(chats)
			})
			.catch(error => console.log(error))
		}
	}

	//runs functions when user logs in
	useEffect(()=> {
		getProfile()
		getChats()
	}, [user])

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
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
		  <Route
		  	path='/profile'
			element= {< Profile user={user} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} getProfile={getProfile} />}
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
