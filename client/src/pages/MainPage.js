import React , {useEffect, useState} from 'react';
import axios from 'axios';



export default function MainPage() {

    const [date, setDate] = useState(null);
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
    const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
    const [currencyNames , setCurrencyNames] = useState([]);
    const [loading, setLoading] = useState(true);

    //handleSubmit method 

    const handleSubmit = async(e) =>{
        e.preventDefault();
      
       try{
        const response = await axios.get("http://localhost:5000/convert",{ params: {
            date,
            sourceCurrency,
            targetCurrency,
            amountInSourceCurrency,
        },

        });

        setAmountInTargetCurrency(response.data);
        setLoading(false);
        

       }catch(err){
           console.error(err);
       }
       

    }

    useEffect(()=>{
        const getCurrencyNames = async ()=>{
            try{
                const response = await axios.get("http://localhost:5000/getAllCurrencies");
                setCurrencyNames(response.data);
            }catch(err){
                console.error(err);
            }
        }
        getCurrencyNames();
    },[])

  return (
    <div>
     
     <h1 className='lg:mx-32 text-5xl font-bold text-yellow-300'>Convert Your Currencies Today</h1>

     <p className='lg:mx-32 opacity-35 py-6'>Welcome to "Convert Your Currencies Today"! This application allows you to easily convert Currencies based on the latest 
        exchange rates. Whether you're planning a trip, managing your finances, or simply curious about the value of your money
        in different currencies, this tool is here to help.
     </p>

     <div className='mt-5 flex items-center justify-center flex-col'>
        <section className='w-full lg:w-1/2'>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor={date} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>

                    <input onChange={(e) => setDate(e.target.value)} type="date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />

                </div>

                <div className='mb-4'>
                    <label htmlFor={sourceCurrency} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>

                    <select onChange={(e) => setSourceCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    
                    name={sourceCurrency} id={sourceCurrency} value={sourceCurrency}>
                        <option value="">Select source currency</option>
                        {Object.keys(currencyNames).map((currency)=>(
                            <option className='p-1' key={currency} value={currency}>
                                {currencyNames[currency]}
                            </option>
                            ))}

                    </select>
                </div>

                <div className='mb-4'>
                    <label htmlFor={targetCurrency} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>

                    <select onChange={(e) => setTargetCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    
                    name={targetCurrency} id={targetCurrency} value={targetCurrency}>
                        <option value="">Select target currency</option>
                        {Object.keys(currencyNames).map((currency)=>(
                            <option className='p-1' key={currency} value={currency}>
                                {currencyNames[currency]}
                            </option>
                            ))}

                    </select>
                </div>

                <div className='mb-4'>
                    <label htmlFor={amountInSourceCurrency} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in source currency</label>

                    <input onChange={(e) => setAmountInSourceCurrency(e.target.value)} type="number" id={amountInSourceCurrency} name={amountInSourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount in source currency" required />
                </div>

                <button className='bg-green-700 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-md'>Get the target Currency</button>

            </form>
        </section>
     </div>
     {!loading ?  <section className='lg:mx-60 text-xl mt-5 '>

       {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals to {" "}
       <span className='text-yellow-300 font-bold'> {amountInTargetCurrency}</span> in {currencyNames[targetCurrency]};
       </section> : null}
    
    
    </div>
  )
}
