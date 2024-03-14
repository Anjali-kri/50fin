"use client";
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {getAllUsers} from './api/user'
import Link from 'next/link';


type UserInterface = {
  id: number,
  name: string,
  email: string,
  phone: string,
  status: number,
  updatedAt: string
};

export default function User() {
  const [allUsers, setAllUsers] = useState<UserInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);

  const showAllUsers = async ()=>{
    try {
      const response = await getAllUsers(); // Assuming getAllUsers is defined
      setAllUsers(response);
      setUsers(response);
      // Handle the response data as needed
      console.log(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error
    }
  }

  const filterUsers = (keyword:string) => {
    const filteredUsers = allUsers.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(keyword.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(keyword.toLowerCase());
      return nameMatch || emailMatch;
    });
    setUsers(filteredUsers);
  };

  useEffect(() => {
    showAllUsers();

  }, []);

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
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">User List</h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These companies have purchased in the last 12 months.</p>
            <input
              type="text"
              className="border-b border-gray-500 focus:outline-none focus:border-indigo-500 py-2 px-4"
              placeholder="Search"
              onChange={(e:  React.ChangeEvent<HTMLInputElement>)=> filterUsers(e.target.value)}
            />
            <Link href="/add_user" className='float-right -my-4'>
                <button className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">                
                  <span className="mx-1">Add New</span>
              </button>
            </Link>
            <div className="flex flex-col mt-10">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <span>User ID</span>
                          </th>
                          <th scope="col" className="px-10 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Name</th>
                          <th scope="col" className="px-10 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email</th>
                          <th scope="col" className="px-10 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Phone</th>
                          <th scope="col" className="px-10 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                          <th scope="col" className="px-10 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Edit</th>
                          <th scope="col" className="px-10 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">UpdatedAt</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {users && users.map((user:any, index) => (
                          <tr key={index}>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              {user?.id}
                            </td>
                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                              {user?.name}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {user?.email}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {user?.phone}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {user?.status}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <Link href="./update_user">
                              <button className="focus:outline-none" onClick={() => handleEdit(user)}>
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" viewBox="0 0 24 24" 
                                  stroke-width="1.5" stroke="currentColor" 
                                  className="w-6 h-6"
                                >
                                  <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" 
                                  />
                                </svg>
                              </button>
                              </Link>
                            </td>
                          </tr>
                        ))}                       
                      </tbody>
                    </table>

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
