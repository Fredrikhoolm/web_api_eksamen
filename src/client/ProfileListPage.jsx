import React, {useState, useEffect} from "react";
import {LoadingView} from "./LoadingView";

export function ProfileListPage() {
    const [profile, setProfile] = useState();
    const [error, setError] = useState();

    async function loadProfile() {
        try {
            const res = await fetch("/api/profilePage");
            if (!res.ok) {
                throw new Error(`Something went wrong loading ${res.url}: ${res.statusText}`);
            }

            const json = await res.json();
            setProfile(json);
        } catch (e) {
            setError(e);
        }
    }

    useEffect(loadProfile, []);

    if (error) {
        return <div>Something went wrong</div>;
    }


    if (!profile) {
        return <LoadingView/>;
    }


    return <>
        <h1>List Profile</h1>
        {profile.map(({id, firstName, lastName}) => (
            <li key={id}>{firstName} {lastName}</li>
        ))}
    </>;
}