import { useNavigate } from "react-router-dom";

interface BreadcrumbProps {
  activeTab: string;
}

const Breadcrumb = ({ activeTab }: BreadcrumbProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <button
        onClick={() => navigate("/dashboard")}
        className="hover:text-blue-600"
      >
        Test Creation
      </button>

      <span>/</span>

      <button
        onClick={() => navigate("/test-creation")}
        className="hover:text-blue-600"
      >
        Create Test
      </button>

      <span>/</span>

      <span className="font-medium text-slate-900">
        {activeTab}
      </span>
    </div>
  );
};

export default Breadcrumb;