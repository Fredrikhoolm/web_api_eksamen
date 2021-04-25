import React, {useState} from "react";


export function CreateProfilePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [year, setYear] = useState("");

    async function submit(e) {
        e.preventDefault();
        console.log("Submitting", {firstName: firstName, lastName: lastName, year});
        await fetch("/api/profilePage", {
            method: "POST",
            body: JSON.stringify({firstName: firstName, lastName: lastName, year}),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return <form onSubmit={submit}>
        <h1>Create new book</h1>
        <div><label>Title: <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/></label></div>
        <div><label>Author: <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/></label></div>
        <div><label>Year: <input type="number" value={year} onChange={e => setYear(e.target.value)}/></label></div>
        <button>Submit</button>
    </form>;
}