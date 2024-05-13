import React, { useEffect, useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import axiosInstance from "../../login/interceptor"; // Assuming axiosInstance is correctly set up

const Chat = () => {
    const [professorDetails, setProfessorDetails] = useState(null);

    useEffect(() => {
        const getProfessorDetails = async () => {
            const id = getID();
            if (!id) {
                console.error("No token found or token is invalid.");
                return;
            }

            try {
                const response = await axiosInstance.get(`http://localhost:8080/professeur/ProfesseursId2/${id}`);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = response.data; // Accessing data directly since axios automatically parses JSON
                setProfessorDetails(data);
            } catch (error) {
                console.error("Error fetching professor details:", error);
            }
        };

        getProfessorDetails();
    }, []); // Dependencies are correct as no external variables are used that could change

    function getID() {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const decoded = jwtDecode(token); // jwtDecode should be imported as default
            return decoded.id;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }

    if (!professorDetails) {
        return <div>Loading...</div>; // Loading state handling
    }

    return (
        <ChatEngine
            height="100vh"
            projectID="5bc79813-f7bf-4ccc-84e7-827b5b12d01c"
            userName={professorDetails.nom}
            userSecret={professorDetails.chatpassword || 'defaultSecret'} // Fallback if chatpassword is undefined
        />
    );
};

export default Chat;
