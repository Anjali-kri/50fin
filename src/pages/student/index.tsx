"use client";
import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';
import {getAllStudents} from '../api/student';
import {deleteStudent} from "../api/student";
import Link from 'next/link';

type StudentInterface = {
  id: number;
  name: string,
  email: string,
  mobile: string,
  status: number,
};

export default function Student() {
  const [allStudents, setAllStudents] = useState<StudentInterface[]>([]);
  const [students, setStudents] = useState<StudentInterface[]>([]);
  const [visibleAddStudentPopup, setVisibleAddStudentPopup] = useState<boolean>(false);

  const showAllStudents = async ()=>{
    try {
      const response = await getAllStudents();
      setAllStudents(response);
      setStudents(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching Students:", error);
      // Handle error
    }
  };

  
  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      showAllStudents();
      console.log("Student with ID", id, "has been deleted successfully.");
    } catch (error) {
      console.error("Error deleting student with ID:", id, error);
    }
  };
  

  const filterStudents = (keyword:string) => {
    const filteredStudents = allStudents.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(keyword.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(keyword.toLowerCase());
      return nameMatch || emailMatch;
    });
    setStudents(filteredStudents);
  };

  useEffect(() => {
    showAllStudents();

  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className=' class="w-3/12 bg-gray-200"'>
          <Sidebar />
        </div>

        <div className='w-9/12 bg-white-300'>
          
          <section className="container px-4 mx-auto">
            <h2 className="text-2xl font-bold py-2 place-content-center text-gray-800 dark:text-white">Student List </h2>

            <input
              type="text"
              className="border-b border-gray-500 focus:outline-none focus:border-indigo-500 py-2 px-4"
              placeholder="Search"
              onChange={(e:  React.ChangeEvent<HTMLInputElement>)=> filterStudents(e.target.value)}
            />
            <Link href="/student/add" className='float-right -my-4'>
                <button data-modal-target="#static-modal" data-modal-toggle="#static-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    Add New
                </button>
            </Link>
            

            <div className="flex flex-col mt-10">
              
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="py-4 px-4 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"><span>User ID</span></th>
                          <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400">Name</th>
                          <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400">Email</th>
                          <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400">Mobile No</th>
                          <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                          <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {students && students.map((student:any, index) => (
                          <tr key={index}>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              {student?.id}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              {student?.name}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {student?.email}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {student?.mobile}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {student?.status}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <Link href="/student/edit">
                              <button className="focus:outline-none">
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" viewBox="0 0 24 24" 
                                  stroke-width="1.5" stroke="blue" 
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
                              <button onClick={() => handleDelete(student.id)} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="delete"><g fill="none" fill-rule="evenodd" stroke="red"><path d="M5.5 7.5V20A1.5 1.5 0 0 0 7 21.5h11a1.5 1.5 0 0 0 1.5-1.5V7.5h-14z"></path><path stroke-linecap="round" d="M8.5 10.41v8.18M12.5 10.41v8.18M16.5 10.41v8.18M9 4.333V3.244C9 2.557 9.627 2 10.4 2h4.2c.773 0 1.4.557 1.4 1.244v1.09"></path><rect width="18" height="3" x="3.5" y="4.5" rx="1.5"></rect></g></svg>
                              </button>
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
