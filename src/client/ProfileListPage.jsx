// import React, {useState, useEffect} from "react";
// import {LoadingView} from "./LoadingView";
// import {Link} from "react-router-dom";
// import {useLoading} from "./useLoading";
// import {ErrorView} from "./ErrorView";
//
// export function ProfileListPage( {profileApi}) {
//     const [profile, setProfile] = useState();
//
//     const { data: profilePage, error, loading, reload } = useLoading(
//         async () => await profileApi.listProfile()
//     );
//
//     async function loadProfile() {
//         try {
//             const res = await fetch("/api/profilePage");
//             if (!res.ok) {
//                 throw new Error(`Something went wrong loading ${res.url}: ${res.statusText}`);
//             }
//
//             const json = await res.json();
//             setProfile(json);
//         } catch (e) {
//             setError(e);
//         }
//     }
//
//     useEffect(loadProfile, []);
//
//     if (error) {
//         return <ErrorView error={error} reload={reload} />;
//     }
//
//
//     if ( loading || !profile) {
//         return <LoadingView/>;
//     }
//
//     return (
//         <>
//             <h1>List profile</h1>
//             {profilePage.map(({ id, firstName, lastName}) => (
//                 <li key={id}>
//                     <Link to={`/profilePage/${id}/edit`}>{firstName} {lastName}</Link>
//                 </li>
//             ))}
//         </>
//     );
// }

import React from "react";
import { LoadingView } from "./LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

export function ProfileListPage({ profileApi }) {
    const { data: profile, error, loading, reload } = useLoading(
        async () => await profileApi.listProfile()
    );

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    if (loading || !profile) {
        return <LoadingView />;
    }

    return (
        <>
            <h1>List books</h1>
            {profile.map(({ id, firstName }) => (
                <li key={id}>
                    <Link to={`/profilePage/${id}/edit`}>{firstName}</Link>
                </li>
            ))}
        </>
    );
}
