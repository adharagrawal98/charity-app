import React from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig'; // Ensure this points to your Firebase Auth setup
import Swal from 'sweetalert2';

const CharityDetailsForm = ({ charityData, handleInputChange }) => {
    const db = getFirestore();

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const user = auth.currentUser; // Retrieve the currently authenticated user

            if (user) {
                // Save charity details in Firestore under `charityDetails` with the user's UID as the document ID
                await setDoc(doc(db, "charityDetails", user.uid), charityData);

                console.log("Charity Details Saved:", charityData);
                Swal.fire({
                    title: 'Details Saved',
                    text: 'Your charity details have been saved successfully!',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                }).then(() => {
                    // Redirect to login page after closing the modal
                    window.location.href = '/login'; // Change '/login' to your login page route
                });
            } else {
                throw new Error("User not authenticated");
            }
        } catch (error) {
            console.error("Error saving charity details:", error);
            Swal.fire({
                title: 'Error',
                text: 'Could not save charity details. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    };

    return (
        <form className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full" onSubmit={submitForm}>
            <h2 className="text-2xl font-semibold mb-4">Charity Details</h2>

            <label className="block mb-2">
                Charity Name:
                <input
                    type="text"
                    name="charityName"
                    value={charityData.charityName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </label>

            <label className="block mb-2">
                Contact Number:
                <input
                    type="tel"
                    name="contactNumber"
                    value={charityData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </label>

            <label className="block mb-2">
                Total Number of Beds Available:
                <input
                    type="number"
                    name="bedsAvailable"
                    value={charityData.bedsAvailable}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </label>

            <label className="block mb-2">
                Rate per Day per Bed:
                <input
                    type="number"
                    name="ratePerDay"
                    value={charityData.ratePerDay}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </label>

            <label className="block mb-2">
                Charity Registration Number:
                <input
                    type="text"
                    name="registrationNumber"
                    value={charityData.registrationNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </label>

            <label className="block mb-2">
                Address:
                <textarea
                    name="address"
                    value={charityData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </label>

            <label className="block mb-4">
                Bank Account Details:
                <input
                    type="text"
                    name="bankAccountDetails"
                    value={charityData.bankAccountDetails}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </label>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Save Details
            </button>
        </form>
    );
};

export default CharityDetailsForm;