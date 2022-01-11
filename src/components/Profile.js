import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import apiUrl from '../apiConfig';

function Profile(props) {
    const [newProfile, setNewProfile] = useState({
        name: '',
        bio: '',
        locations: [],
        likedUsers: [],
        owner: props.user.id
    })
    const [edit, setEdit]
}