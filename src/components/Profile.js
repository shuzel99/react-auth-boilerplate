import { prependOnceListener } from 'process';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import apiUrl from '../apiConfig';

function Profile(props) {
    const [newProfile, setNewProfile] = useState({
        name: '',
        bio: '',
        locations: [],
        likedUsers: [],
        owner: props.user._id
    })
    const [edit, setEdit] = useState(false)

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

    const handleEdit = (e) => {
        e.preventDefault()
        let preJSONBody = {
            name: newProfile.name,
            bio: newProfile.bio,
            locations: newProfile.split(',').map(location => location.trim()),
            likedUsers: newProfile.likedUsers,
            owner: newProfile.owner
        }
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
            props.getProfile()
        })
        .catch(error => { console.log(error) })
    }
    //add forms at bottom
}

 export default Profile   

    