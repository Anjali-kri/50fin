"use client";
import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';
import {editStudent} from '../api/student'
import Link from 'next/link';
import { useRouter } from 'next/router';

type StudentInterface = {
  name: string,
  email: string,
  mobile: string,
  status: number,
};

export default function Student() {
    const [students, setStudents] = useState<StudentInterface>({
        name: "",
        email: "",
        mobile: "",
        status: 1,
    });
    const [formData, setFormData] = useState({students});
    const router = useRouter();

    const handleEdit = async ()=>{
        const data = await editStudent(students);
        console.log(data);
        router.push('/student');
    }

  return (
    <div>
      <Navbar />
      <div className="flex">
        {/* <Navbar /> */}
        <div className=' class="w-3/12 bg-gray-200"'>
          <Sidebar />
        </div>

        <div className='w-9/12 bg-white-300'>          
        <section className="container px-4 mx-auto">
            
            <Link href="/student" className='float-right -my-4'>
                <button data-modal-target="#static-modal" data-modal-toggle="#static-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    Back
                </button>
            </Link>
            

            <div className="flex flex-col mt-8">              
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden dark:border-gray-700 md:rounded-lg">
                    {/* {JSON.stringify(students)} */}
                    <form className="max-w-sm mx-auto border-2 p-4 rounded-lg">
                        <div>
                        <h1 className="text-2xl font-bold place-content-center text-gray-800 dark:text-white">Update Student Record</h1>
                        </div>
                    <div className="mb-5 mt-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name </label>
                        <input type="text" id="name" name='name' className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Name" value={students.name}
                            onChange={(e) => setStudents((students) => ({ ...students, [e.target.name]: e.target.value }))} required />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email </label>
                        <input type="email" id="email" name='email' className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter valid Email" value={students.email}
                        onChange={(e) => setStudents((students) => ({ ...students, [e.target.name]: e.target.value }))}  required />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile No </label>
                        <input type="text" id="mobile" name='mobile' className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter valid Mobile number" value={students.mobile} maxLength={10}
                        onChange={(e) => setStudents((students) => ({ ...students, [e.target.name]: e.target.value }))}  required />
                    </div>
                    <button type="button" className="text-white mb-8 m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleEdit}>Update</button>
                    <Link href="/student">
                        <button type="button" className="text-white mb-4 bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Cancle</button>
                    </Link>
                </form>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
    </div>
    
  )
}
