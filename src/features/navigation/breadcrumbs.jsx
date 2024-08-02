import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex space-x-2 text-gray-600">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return (
            <BreadcrumbItem key={to}>
              {index + 1 === pathnames.length ? (
                <BreadcrumbPage>{value}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={to} className="hover:underline">
                      {value}
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
