// import { Sidebar } from 'lucide-react'
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { deleteTest, getTests } from '../service/apiService';
import { toast } from 'sonner';
import type { Test } from '../types';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Layout from '../components/layout';

const Dashboard = () => {
     const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage,setCurrentPage]=useState(1)
  const Items_Per_Page=20
  const navigate = useNavigate();
   
    const filtered = tests.filter(t =>
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.subject?.toLowerCase().includes(search.toLowerCase())
  );
  const getPaginationItems = (
  currentPage: number,
  totalPages: number
) => {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    );
  }

  pages.push(1);

  if (currentPage > 4) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(
    totalPages - 1,
    currentPage + 1
  );

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 3) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
};



  const paginatedTests=filtered.slice((currentPage-1)* Items_Per_Page,currentPage*Items_Per_Page)

  const totalPages=Math.ceil(filtered.length/Items_Per_Page)
const paginationItems = getPaginationItems(
  currentPage,
  totalPages
);
  const handleSearch=(value:string)=>
  {
    setSearch(value)
    setCurrentPage(1)
  }

  const fetchTests = async () => {
    setLoading(true);
    try {
      const res = await getTests();
      setTests(res.data.data || []);
    } catch {
      toast.error('Failed to load tests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTests(); }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this test?')) return;
    try {
      await deleteTest(id);
      toast.success('Test deleted');
      fetchTests();
    } catch {
      toast.error('Failed to delete');
    }
  };


  const statusCount = (s: string) => tests.filter(t => t.status === s).length;

  return (
    <>
    <Layout>
    
  <div className="space-y-6">
 
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-500">
          Manage all your tests from here
        </p>
      </div>

      <button
        onClick={() => navigate("/test-creation")}
        className="flex items-center gap-2 cursor-pointer bg-[#384EC7] hover:bg-[#1B5DEF] text-[#FAFAFA] px-5 py-3 rounded-lg"
      >
        <Plus size={18} />
        Create New Test
      </button>
    </div>

    
    <div className="grid md:grid-cols-3 gap-5">
      <div className="bg-white rounded-xl shadow-sm p-5">
        <p className="text-slate-500">Total Tests</p>
        <h2 className="text-3xl font-bold mt-2">
          {tests.length}
        </h2>
      </div>

      <div className="bg-green-50 rounded-xl p-5">
        <p className="text-green-600">Published</p>
        <h2 className="text-3xl font-bold mt-2">
          {statusCount("live")}
        </h2>
      </div>

      <div className="bg-yellow-50 rounded-xl p-5">
        <p className="text-yellow-600">Drafts</p>
        <h2 className="text-3xl font-bold mt-2">
          {statusCount("draft")}
        </h2>
      </div>
    </div>

    
    <div className="bg-white rounded-xl shadow-sm">
      
      <div className="p-5 border-b">
        <div className="relative max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search tests..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      
      {loading ? (
        <div className="p-10 text-center">
          Loading tests...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-slate-500 mb-4">
            No tests found
          </p>

          <button
            onClick={() => navigate("/test-creation")}
            className="bg-[#384EC7] cursor-pointer text-white px-4 py-2 rounded-lg"
          >
            Create Test
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4">#</th>
                <th className="text-left p-4">Test Name</th>
                <th className="text-left p-4">Subject</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Marks</th>
                <th className="text-left p-4">Duration</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
                
              {paginatedTests.map((test, idx) => (
                <tr
                  key={test.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4">{idx + 1}</td>

                  <td className="p-4 font-medium">
                    {test.name}
                  </td>

                  <td className="p-4">
                    {test.subject}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-slate-100">
                      {test.type || "-"}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        test.status === "live"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {test.status === "live"
                        ? "Published"
                        : "Draft"}
                    </span>
                  </td>

                  <td className="p-4">
                    {test.total_marks || "-"}
                  </td>

                  <td className="p-4">
                    {test.total_time
                      ? `${test.total_time} min`
                      : "-"}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/preview/${test.id}`)
                        }
                        className="p-2 rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-200"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(
                            `/test-creation/${test.id}`
                          )
                        }
                        className="p-2 rounded-lg cursor-pointer bg-blue-100 hover:bg-blue-200 text-[#1B5DEF]"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(test.id)
                        }
                        className="p-2 rounded-lg cursor-pointer bg-red-100 hover:bg-red-200 text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-5 py-4 border-t">
  <p className="text-sm text-slate-500">
    Showing {(currentPage - 1) * Items_Per_Page + 1} -
    {Math.min(currentPage * Items_Per_Page, filtered.length)}
    {" "}of {filtered.length}
  </p>

  <div className="flex items-center justify-center gap-2  mt-6">

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage((prev) => prev - 1)
    }
    className="px-3 py-2 cursor-pointer border rounded cursor-pointer"
  >
    Prev
  </button>

  {paginationItems.map((item, index) =>
    item === "..." ? (
      <span
        key={index}
        className="px-2"
      >
        ...
      </span>
    ) : (
      <button
        key={index}
        onClick={() =>
          setCurrentPage(Number(item))
        }
        className={`px-3 py-2 cursor-pointer rounded ${
          currentPage === item
            ? "bg-blue-600 text-white"
            : "border"
        }`}
      >
        {item}
      </button>
    )
  )}

  <button
    disabled={currentPage === totalPages}
    onClick={() =>
      setCurrentPage((prev) => prev + 1)
    }
    className="px-3 py-2 border cursor-pointer rounded"
  >
    Next
  </button>

</div>
</div>
        </div>
      )}
    </div>
  </div>
   </Layout> 
   
    </>
  )
}

export default Dashboard