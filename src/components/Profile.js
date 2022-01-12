import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import apiUrl from '../apiConfig';

// define new profile
function Profile(props) {
    console.log("props.user", props.user)
    const [newProfile, setNewProfile] = useState({
        name: '',
        bio: '',
        locations: [],
        likedUsers: [],
        owner: props.user._id
    })
    const [edit, setEdit] = useState(false)
// helper func
    const editProfile = (e) => {
        setEdit(true)
        setNewProfile({
            name: props.currentProfile.name,
            bio: props.currentProfile.bio,
            locations: props.currentProfile.locations.join(', '),
            likedUsers: props.currentProfile.likedUsers,
            owner: props.user._id
        })
    }
    
    const handleChange = (e) => {
        setNewProfile({...newProfile, [e.target.name]: e.target.value})
    }
//  set edit
    const handleEdit = (e) => {
        e.preventDefault()
        let preJSONBody = {
            name: newProfile.name,
            bio: newProfile.bio,
            locations: newProfile.split(',').map(location => location.trim()),
            likedUsers: newProfile.likedUsers,
            owner: newProfile.owner
        }
        //  fetch to update profile
        fetch(apiUrl + `profiles/${props.currentProfile._id}`, {
            method: 'PATCH',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
        .then (() => {
            setNewProfile({
                name: '', 
                bio: '', 
                locations: [],
                likedUsers: [],
                owner: props.user._id
            })
            
            setEdit(false)
            props.getProfile()
        })
        .catch(error => { console.log(error) })
    }
//  creat first prof
    const handleSubmit = (e) => {
        e.preventDefault()
        let preJSONBody = {
            name: newProfile.name,
            bio: newProfile.bio,
            locations: newProfile.locations.split(',').map(location => location.trim()),
            likedUsers: newProfile.likedUsers,
            owner: newProfile.owner
        }
        fetch(apiUrl + '/profiles', {
            method: 'POST',
            body: JSON.stringify(preJSONBody),
            headers: {'Content-Type': 'application/JSON'}
        })
        .then(response => response.json())
        .then(() => {
            setNewProfile({
            name: '',
            bio: '',
            locations: [],
            likedUsers: [],
            owner: props.user._id
        })
        props.getProfile()
    })
    .catch(error => {console.log(error)})

//  forms coming
    
    let display
    if (props.currentProfile === undefined) {
        display = (
            <form id='new-profile-form-container' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input onChange={handleChange} type='text' name='name' id='name' value={newProfile.name} />
                </div>
                <div>
                    <label htmlFor='bio'>Tell us about You:</label>
                    <input onChange={handleChange} type='text' name='bio' id='bio' value={newProfile.bio} />
                </div>
                <div>
                    <label htmlFor='locations'>Inteded Destinations:</label>
                    <input onChange={handleChange} type='text' name='locations' id='locations' value={newProfile.locations} />
                </div>
                <input className='brand-button' type='submit' value='submit'/>
            </form>
        )
    }
//if edit info is false show for
    else {
        if (edit === false){
            const locationList = props.currentProfile.locations.map(location => {
                return (<li>{location}</li>)
            })
            display = (
                 <div id='profile-container'>
                    <h1>{props.currentProfile.name}'s Profile</h1>
                    <h3>Locations:</h3>
                    <ul id='location-ul'>
                        {locationList}
                    </ul>
                    <h4>Bio: {props.currentProfile.bio}</h4>
                    <button className='brand-button' onClick={editProfile}>Edit Profile</button>
                </div>    
            )
    }else{
        display = (
            <form onSubmit={handleEdit}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input onChange={{handleChange}} type='text' name='name' id='name' value={newProfile.name} required></input>
                </div>
                <div>
                    <label htmlFor='bio'>Tell us a little about yourself:</label>
                    <input onChange={{handleChange}} type='text' name='bio' id='bio' value={newProfile.bio} required></input>
                </div>
                <div>
                    <label htmlFor='locations'>Where are we going:</label>
                    <input onChange={{handleChange}} type='text' name='locations' id='locations' value={newProfile.locations} required></input>
                </div>
                <input className='brand-button' type='submit' value='submit'/>
            </form>)
    }

    }
    return (
        <div>
            {display}
        </div>
    )
    }
}

 export default Profile   

    