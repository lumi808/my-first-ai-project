'use client'
import React, { useState } from 'react'

export default function Buttons({setOptionButtons, sendMessage, places, handleAdditionalMessage}){

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [names, setNames] = useState([])
    const [addresses, setAddresses] = useState([])
    const [childVariable, setChildVariable] = useState('');

    const updateOptionButtons = () => {
        setOptionButtons(false);
      };


    const pressOption = async (input, option) => {
        const urlArray = []

        for(let i = 0; i < option.length; i++){
            urlArray.push(`https://catalog.api.2gis.com/3.0/items?q=Алмата ${option[i]}&type=branch&sort=rating&key=${process.env.NEXT_PUBLIC_TWO_GIS_KEY}`)
        }

        let requestsArray = urlArray.map((url) => {
            let request = new Request(url);
            return request;
        });
     

        await Promise.all(requestsArray.map((request) => {
            return fetch(request).then((response) => {
                return response.json();
            }).then((data) => {
                return data;
            });
        })).then((values) => {
            console.log(values)
            let items = values[0].result.items;
            let names = items.map((item) => item.name);
            let addresses = items.map((item) => item.address_name);
            setData(values)
            console.log(names)
            setNames((prevNames)=> [...prevNames, ...names])
            setAddresses((prevAdaress)=> [...prevAdaress, ...addresses])
        }).catch(console.error.bind(console));

        const additionalMessage = names.join(' ')
        setChildVariable(additionalMessage);
        handleAdditionalMessage(childVariable);
        
        await sendMessage(input);
        updateOptionButtons()
        
    }
    // console.log(data)
    // console.log(names)
    // console.log(addresses)
    return (
        <div className="flex justify-center">
            <button type="button" onClick={() => pressOption(`Option 2`, places[0])} className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Option 1</button>
            <button type="button" onClick={() => pressOption(`Option 2`, places[1])} className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Option 2</button>
            <button type="button" onClick={() => pressOption(`Option 3`, places[2])} className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Option 3</button>
        </div>
    )
}