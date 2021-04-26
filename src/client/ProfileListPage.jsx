import React, {useState, useEffect} from "react";
import {LoadingView} from "./LoadingView";
import {Link} from "react-router-dom";
import {useLoading} from "./useLoading";

export function ProfileListPage( {profileApi}) {
    const [profile, setProfile] = useState();

    const { data: profilePage, error, loading, reload } = useLoading(
        async () => await profileApi.listProfile()
    );

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

    return (
        <>
            <h1>List profile</h1>
            {profilePage.map(({ id, firstName, lastName}) => (
                <li key={id}>
                    <Link to={`/profilePage/${id}/edit`}>{firstName} {lastName}</Link>
                </li>
            ))}
        </>
    );
}