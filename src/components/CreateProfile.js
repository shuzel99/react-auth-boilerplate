import axios from 'axios';
import React, { useState, useEffect } from 'react';
import apiUrl from '../apiConfig';

const CreateProfile = (props) => {
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [locations, setLocations] = useState('')


//grab the value of each state
const nameValue = (e) => {
    setName(e.target.value)
}

const bioValue = (e) => {
    setBio(e.target.value)
}

const locationsValue = (e) => {
    setLocations(e.target.value)
}

const submitProfile = (e) => {
    e.preventDefault()
    axios.post(`${apiUrl}/profile`, {
        name: name,
        bio: bio,
        locations: locations
    })
    .then(profile => {
        console.log('profile created', profile.data)
        props.setProfile(profile.data)
    })
    .catch(err => console.log(err))
}
    return (
        <div>
            <h1>Create Profile</h1>
            <form>
                <h1 htmlFor="Enter Name">Name:</h1>
                <input type='text' onChange={nameValue}></input>
                <br />
                <h1 htmlFor="Tell us about yourself">Tell use about yourself:</h1>
                <input type='text' onChange={bioValue}></input>
                <br />
                <h1 htmlFor="Where are you interested in traveling">Where are you intersted in travelling:</h1>
                <input type='text' onChange={locationsValue}></input>
                <br />
                <button className='submitProfile' onClick={submitProfile}>Submit</button>
            </form>
        </div>
    )
}

//     //CREATING PROFILE
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         let preJSONBody = {
//             name: newProfile.name,
//             bio: newProfile.bio,
//             locations: newProfile.locations.split(',').map(location => location.trim()),
//             likedUsersId: newProfile.likedUsersId.split(',').map(liked => liked.trim()),
//             userId: newProfile.userId
//         }
//         fetch(apiUrl + '/profile', {
//             method: 'POST',
//             body: JSON.stringify(preJSONBody),
//             headers: { 'Content-Type': 'application/JSON'}
//         })
//         .then(response => response.json())
//         .then(() => {
//             setNewProfile({
//                 name: '',
//                 bio: '',
//                 locations: [],
//                 likedUsersId: [],
//                 //picture: ''
//                 userId: props.user._id
//             })



//         fetch(apiUrl + '/profile', {
//             method: 'POST',
//             body: JSON.stringify(preJSONBody),
//             headers: { 'Content-Type': 'application/JSON'}
//         })
// let Profile = (props) => {
//     console.log("props in profile", props)
//     //  DEFINE NEW PROFILE STATE    
//     const [newProfile, setNewProfile] = useState({
//         name: '',
//         bio: '',
//         locations: [],
//         likedUsersId: [],
//         //picture: ''
//         userId: props.user._id
//     })
//     //Sets Profile state to entered values
//     const handleChange = (e) => {
//         setNewProfile({...newProfile, [e.target.name]: e.target.value})
//     }

//     //CREATING PROFILE
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         let preJSONBody = {
//             name: newProfile.name,
//             bio: newProfile.bio,
//             locations: newProfile.locations.split(',').map(location => location.trim()),
//             likedUsersId: newProfile.likedUsersId.split(',').map(liked => liked.trim()),
//             userId: newProfile.userId
//         }
//         fetch(apiUrl + '/profile', {
//             method: 'POST',
//             body: JSON.stringify(preJSONBody),
//             headers: { 'Content-Type': 'application/JSON'}
//         })
//         .then(response => response.json())
//         .then(() => {
//             setNewProfile({
//                 name: '',
//                 bio: '',
//                 locations: [],
//                 likedUsersId: [],
//                 //picture: ''
//                 userId: props.user._id
//             })
//             props.getProfile()
//         })
//         .catch(error => { console.log(error) })
//     }

//     //FORMS!!
//     let display
//     if (props.currentProfile === undefined) {
//         display = (
//             <form id='new-profile-form-container' onSubmit={handleSubmit} >
//             <div>
//                 <label htmlFor='name'>Name</label>
//                 <input onChange={handleChange} type='text' name='name' id='name' value={newProfile.name} />
//             </div>
//             <div>
//                 <label htmlFor='bio'>Tell Us About Yourself:</label>
//                 <input onChange={handleChange} type='text' name='bio' id='bio' value={newProfile.bio} />
//             </div>
//             <div>
//                 <label htmlFor='locations'>Locations:</label>
//                 <input onChange={handleChange} type='text' name='locations' id='locations' value={newProfile.locations} />
//             </div>
//             <input className='brand-button' type='submit' value='submit' />
//         </form>
//         )
//     }
//     if(!props.currentProfile) {
//         return (<div>Loading...</div>)
//     }else{
//        return (
//         <div>
//             {display}
//         </div>
//     ) 
//     }
    

// }

export default CreateProfile
   

    