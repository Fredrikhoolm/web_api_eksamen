import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import * as React from "react";
import { ChatPage } from "./ChatPage";
import {ProfileListPage} from "./ProfileListPage";
import {CreateProfilePage} from "./CreateProfilePage";
import {fetchJSON, postJSON} from "./http";
import {EditProfilePage} from "./EditProfilePage";

export function Application() {

    const profileApi = {
        listProfile: async () => await fetchJSON("/api/profilePage"),
        getProfile: async (id) => await fetchJSON(`/api/profilePage/${id}`),
        createProfile: async ({ firstName, lastName }) => {
            return postJSON("/api/profilePage", {
                method: "POST",
                json: { firstName, lastName },
            });
        },
        updateProfile: async (id, { firstName, lastName }) =>
           await postJSON(`/api/profilePage/${id}`, {
                method: "PUT",
                json: { firstName, lastName },
            }),
    };


    return (
        <BrowserRouter>
            <header>
                <Link to={"/"}>Home</Link>
            </header>
            <Switch>
                <Route path={"/"} exact>

                    <h1>Home page</h1>
                    <ul>

                        {/*<li>*/}
                        {/*    <Link to={"/profile"}>Profile</Link>*/}
                        {/*</li>*/}

                        <li>
                            <Link to={"/chat"}>Chat</Link>
                        </li>
                        <li>
                            <Link to={"/login"}>Login</Link>
                        </li>

                        <li>
                            <Link to={"/profilePage"}>List profile</Link>
                        </li>

                        <li>
                            <Link to={"/create"}>Create Profile</Link>
                        </li>

                    </ul>
                </Route>

                {/*<Route path={"/profile"}>*/}
                {/*    <ProfilePage />*/}
                {/*</Route>*/}

                <Route path={"/profilePage/:id/edit"}>
                    <EditProfilePage profileApi={profileApi}/>
                </Route>

                <Route exact path={"/profilePage"}>
                    <ProfileListPage profileApi={profileApi}/>
                </Route>

                <Route path={"/create"}>
                    <CreateProfilePage profileApi={profileApi}/>
                </Route>
                <Route path={"/chat"}>
                    <ChatPage />
                </Route>
                <Route path={"/login"}>
                    <h1>Login page</h1>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
